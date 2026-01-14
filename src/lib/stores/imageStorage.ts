/**
 * IndexedDB storage for chat images
 * Provides much larger storage capacity than localStorage (~50MB+ vs 5MB)
 */

const DB_NAME = "ai-chat-images";
const DB_VERSION = 1;
const STORE_NAME = "images";

let db: IDBDatabase | null = null;

/**
 * Initialize the IndexedDB database
 */
export const initImageStorage = (): Promise<IDBDatabase> => {
	return new Promise((resolve, reject) => {
		if (db) {
			resolve(db);
			return;
		}

		const request = indexedDB.open(DB_NAME, DB_VERSION);

		request.onerror = () => {
			if (import.meta.env.DEV) {
				console.error("Failed to open image storage:", request.error);
			}
			reject(request.error);
		};

		request.onsuccess = () => {
			db = request.result;
			resolve(db);
		};

		request.onupgradeneeded = (event) => {
			const database = (event.target as IDBOpenDBRequest).result;

			// Create the images store if it doesn't exist
			if (!database.objectStoreNames.contains(STORE_NAME)) {
				const store = database.createObjectStore(STORE_NAME, { keyPath: "id" });
				// Index by conversation ID for bulk operations
				store.createIndex("conversationId", "conversationId", {
					unique: false,
				});
			}
		};
	});
};

/**
 * Stored image record
 */
export interface StoredImage {
	id: string;
	conversationId: string;
	data: string; // base64 data URL
	mimeType: string;
	name?: string;
	createdAt: number;
}

/**
 * Save an image to IndexedDB
 */
export const saveImage = async (
	id: string,
	conversationId: string,
	data: string,
	mimeType: string,
	name?: string,
): Promise<void> => {
	const database = await initImageStorage();

	return new Promise((resolve, reject) => {
		const transaction = database.transaction(STORE_NAME, "readwrite");
		const store = transaction.objectStore(STORE_NAME);

		const record: StoredImage = {
			id,
			conversationId,
			data,
			mimeType,
			name,
			createdAt: Date.now(),
		};

		const request = store.put(record);

		request.onsuccess = () => resolve();
		request.onerror = () => {
			if (import.meta.env.DEV) {
				console.error("Failed to save image:", request.error);
			}
			reject(request.error);
		};
	});
};

/**
 * Get an image from IndexedDB
 */
export const getImage = async (id: string): Promise<StoredImage | null> => {
	const database = await initImageStorage();

	return new Promise((resolve, reject) => {
		const transaction = database.transaction(STORE_NAME, "readonly");
		const store = transaction.objectStore(STORE_NAME);
		const request = store.get(id);

		request.onsuccess = () => resolve(request.result || null);
		request.onerror = () => {
			if (import.meta.env.DEV) {
				console.error("Failed to get image:", request.error);
			}
			reject(request.error);
		};
	});
};

/**
 * Get multiple images by their IDs
 */
export const getImages = async (
	ids: string[],
): Promise<Map<string, StoredImage>> => {
	const database = await initImageStorage();
	const results = new Map<string, StoredImage>();

	return new Promise((resolve) => {
		const transaction = database.transaction(STORE_NAME, "readonly");
		const store = transaction.objectStore(STORE_NAME);

		let completed = 0;

		if (ids.length === 0) {
			resolve(results);
			return;
		}

		for (const id of ids) {
			const request = store.get(id);

			request.onsuccess = () => {
				if (request.result) {
					results.set(id, request.result);
				}
				completed++;
				if (completed === ids.length) {
					resolve(results);
				}
			};

			request.onerror = () => {
				if (import.meta.env.DEV) {
					console.error("Failed to get image:", id, request.error);
				}
				completed++;
				if (completed === ids.length) {
					resolve(results);
				}
			};
		}
	});
};

/**
 * Delete an image from IndexedDB
 */
export const deleteImage = async (id: string): Promise<void> => {
	const database = await initImageStorage();

	return new Promise((resolve, reject) => {
		const transaction = database.transaction(STORE_NAME, "readwrite");
		const store = transaction.objectStore(STORE_NAME);
		const request = store.delete(id);

		request.onsuccess = () => resolve();
		request.onerror = () => {
			if (import.meta.env.DEV) {
				console.error("Failed to delete image:", request.error);
			}
			reject(request.error);
		};
	});
};

/**
 * Delete all images for a conversation
 */
export const deleteConversationImages = async (
	conversationId: string,
): Promise<number> => {
	const database = await initImageStorage();

	return new Promise((resolve, reject) => {
		const transaction = database.transaction(STORE_NAME, "readwrite");
		const store = transaction.objectStore(STORE_NAME);
		const index = store.index("conversationId");
		const request = index.openCursor(IDBKeyRange.only(conversationId));

		let deletedCount = 0;

		request.onsuccess = (event) => {
			const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
			if (cursor) {
				cursor.delete();
				deletedCount++;
				cursor.continue();
			} else {
				resolve(deletedCount);
			}
		};

		request.onerror = () => {
			if (import.meta.env.DEV) {
				console.error("Failed to delete conversation images:", request.error);
			}
			reject(request.error);
		};
	});
};

/**
 * Clear all images from storage
 */
export const clearAllImages = async (): Promise<void> => {
	const database = await initImageStorage();

	return new Promise((resolve, reject) => {
		const transaction = database.transaction(STORE_NAME, "readwrite");
		const store = transaction.objectStore(STORE_NAME);
		const request = store.clear();

		request.onsuccess = () => resolve();
		request.onerror = () => {
			if (import.meta.env.DEV) {
				console.error("Failed to clear images:", request.error);
			}
			reject(request.error);
		};
	});
};

/**
 * Get storage usage estimate
 */
export const getStorageEstimate = async (): Promise<{
	used: number;
	quota: number;
} | null> => {
	if (!navigator.storage?.estimate) {
		return null;
	}

	try {
		const estimate = await navigator.storage.estimate();
		return {
			used: estimate.usage || 0,
			quota: estimate.quota || 0,
		};
	} catch {
		return null;
	}
};
