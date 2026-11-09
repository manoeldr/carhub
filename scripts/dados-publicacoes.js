// Armazenamento de mídias compartilhado entre Nova publicação e Perfil.
(() => {
  let database;
  // Guarda os arquivos binários no IndexedDB, evitando o limite reduzido do localStorage.
  function mediaDatabase() {
    if (!database)
      database = new Promise((resolve, reject) => {
        const request = indexedDB.open("carhub-midias", 1);
        request.onupgradeneeded = () =>
          request.result.createObjectStore("publicacoes", { keyPath: "id" });
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
        request.onblocked = () => reject(new Error("Armazenamento bloqueado."));
      }).catch((error) => {
        database = null;
        throw error;
      });
    return database;
  }
  window.mediaRecord = async function (action, value) {
    const db = await mediaDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(
        "publicacoes",
        action === "get" ? "readonly" : "readwrite",
      );
      const store = transaction.objectStore("publicacoes");
      const request = store[action](value);
      transaction.oncomplete = () => resolve(request.result);
      transaction.onerror = () => reject(transaction.error || request.error);
      transaction.onabort = () =>
        reject(transaction.error || new Error("Operação cancelada."));
    });
  };
})();
