import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";

//query client
function createQueryClient(staleTime = 5 * 60 * 1000) {
	const cache = new Map();
	const subscribers = new Map();
	return {
		async fetchQuery (queryKey, queryFn) {
            const queryId = JSON.stringify(queryKey);
            const cached = cache.get(queryId);

            if (cached && Date.now() - cached.timestamp < staleTime) {
                return cached.data;
            }

            try {
                const data = await queryFn();
                this.setQueryData(queryKey, data);
                return data;
            } catch (error) {
                throw error;
            }
        },

		setQueryData(queryKey, data) {
			const queryId = JSON.stringify(queryKey);
			cache.set(queryId, { data, timestamp: Date.now() });

			// Notify subscribers
			if (subscribers.has(queryId)) {
				subscribers.get(queryId).forEach((callback) => callback(data));
			}
		},
		getQueryData(queryKey) {
			// get from cache
			const queryId = JSON.stringify(queryKey);
			return cache.get(queryId)?.data || null;
		},
		subscribe(queryKey, callback) {
			const queryId = JSON.stringify(queryKey);
			if (!subscribers.has(queryId)) {
				subscribers.set(queryId, []);
			}
			const callbacks = subscribers.get(queryId);
			if (!callbacks.includes(callback)) {
				callbacks.push(callback);
			}		
		},
		unsubscribe(queryKey, callback) {
			const queryId = JSON.stringify(queryKey);

			if (subscribers.has(queryId)) {
				const updatedSubscribers = subscribers
					.get(queryId)
					.filter((cb) => cb !== callback);
				subscribers.set(queryId, updatedSubscribers);
			}
		},
	};
}

// query client context

const QueryClientContext = createContext(null);

const QueryClientProvider = ({ client, children }) => {
	return (
		<QueryClientContext.Provider value={client}>
			{children}
		</QueryClientContext.Provider>
	);
};

function useQueryClient() {
	const client = useContext(QueryClientContext);
	if (!client) {
		throw new Error(
			"useQueryClient must be used within a QueryClientProvider"
		);
	}

	return client;
}

function useQuery({ queryKey, queryFn, enabled = true }) {
    const client = useQueryClient();
    const [data, setData] = useState(() => client.getQueryData(queryKey));
    const [isLoading, setIsLoading] = useState(!data && enabled);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        if (!enabled) return; 

        setIsLoading(true);
        setError(null);
        try {
            const freshData = await client.fetchQuery(queryKey, queryFn);
            setData(freshData);
			return freshData
        } catch (error) {
            setError(error);
			return null
        } finally {
            setIsLoading(false);
        }
    }, [client, queryKey, queryFn, enabled]);

    useEffect(() => {
        if (!enabled) return;

        const updateData = (newData) => {
            setData(newData);
        };

        client.subscribe(queryKey, updateData);

        if (!data) {
            fetchData();
        }

        return () => {
            client.unsubscribe(queryKey, updateData);
        };
    }, [client, queryKey, fetchData, enabled]);

    return {
        data,
        isLoading,
        error,
        refetch: fetchData,
    };
}


export default createQueryClient;
export { QueryClientProvider, useQueryClient, useQuery };
