// Masaüstü köprüsü: programın web sürümündeki veri ve indirme arayüzünü,
// USB klasöründeki dosyalara yazan masaüstü kabuğuna bağlar.
(function () {
  const B = window.altintas;
  if (!B) return;

  const db = {
    collection(col) {
      return {
        async get() {
          const docs = await B.dbList(col);
          return { docs: docs.map(d => ({ id: d.id, data: () => d.data })) };
        },
        doc(id) {
          return {
            set: body => B.dbPut(col, id, body),
            delete: () => B.dbDel(col, id)
          };
        }
      };
    }
  };

  const downloads = {
    async save({ filename, data }) {
      const payload = data instanceof Blob ? new Uint8Array(await data.arrayBuffer()) : String(data);
      const r = await B.save(filename, payload);
      if (r === "cancel") { const e = new Error("declined"); e.code = "declined"; throw e; }
      return { status: "saved" };
    }
  };

  // Eski kabukta (1.0.x) bilgi/ac/goster yoktur; program bunları varsa kullanır.
  window.altintasMasaustu = {
    pdf: o => B.pdf(o),
    bilgi: B.bilgi ? () => B.bilgi() : null,
    yedekAl: B.yedekAl ? () => B.yedekAl() : null,
    ac: B.ac ? ne => B.ac(ne) : null,
    goster: B.goster ? yol => B.goster(yol) : null
  };
  window.claude = { use: async name => name === "db" ? db : name === "downloads" ? downloads : null };
})();
