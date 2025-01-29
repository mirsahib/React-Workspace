import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";

//query client
function createQueryClient() {
	const cache = new Map();
	const subscribers = new Map();
	return {
		async fetchQuery(queryKey, queryFn) {
			// fetch from cache
			const queryId = JSON.stringify(queryKey);

			// Check the cache
			if (cache.has(queryId)) {
				return cache.get(queryId).data;
			}

			// Fetch fresh data
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
			subscribers.get(queryId).push(callback);
		},
		unsubsribe(queryKey, callback) {
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

function useQuery({ queryKey, queryFn,refetch, enabled }) {
	const client = useQueryClient();
	const [data, setData] = useState(() => client.getQueryData(queryKey));
	const [isLoading, setIsLoading] = useState(!data);
	const [error, setError] = useState(null);

	const fetchData = useCallback(async () => {
		setIsLoading(true);
		setError(null);
		try {
			const freshData = await client.fetchQuery(queryKey, queryFn);
			setData(freshData);
		} catch (error) {
			setError(true);
		} finally {
			setIsLoading(false);
		}
	}, [client, queryKey, queryFn]);

	useEffect(() => {
		const updateData = (updateData) => {
			setData(updateData);
		};
		client.subscribe(queryKey, updateData);
		fetchData();
		return () => {
			client.unsubsribe(queryKey,updateData);
		};
	}, [client, queryKey, fetchData]);

	return {
		data,
		isLoading,
		error,
	};
}

export { createQueryClient, QueryClientProvider, useQueryClient, useQuery };
