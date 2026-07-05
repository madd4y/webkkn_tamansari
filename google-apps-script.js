/* eslint-disable @typescript-eslint/no-unused-vars */

const CONFIG = {
  umkm: {
    sheetName: "UMKM",
    type: "collection",
    headers: ["id", "nama", "kategori", "pemilik", "deskripsi", "whatsapp", "maps", "foto", "createdAt", "jamBuka"],
    jsonFields: [],
  },
  dokumentasi: {
    sheetName: "Dokumentasi",
    type: "collection",
    headers: ["id", "judul", "tanggal", "deskripsi", "foto", "createdAt"],
    jsonFields: [],
  },
  profil: {
    sheetName: "Profil",
    type: "singleton",
    headers: [
      "id",
      "sejarah",
      "visi",
      "misi",
      "geografis",
      "luas",
      "ketinggian",
      "utara",
      "selatan",
      "timur",
      "barat",
      "maps",
      "struktur",
    ],
    jsonFields: ["misi", "struktur"],
  },
  penduduk: {
    sheetName: "Penduduk",
    type: "singleton",
    headers: ["tahun", "jumlahPenduduk", "lakiLaki", "perempuan", "kk", "rt", "rw"],
    jsonFields: [],
  },
  video: {
    sheetName: "Video",
    type: "singleton",
    headers: ["id", "judul", "youtubeUrl", "deskripsi", "tanggalPublikasi"],
    jsonFields: [],
  },
  kontak: {
    sheetName: "Kontak",
    type: "singleton",
    headers: [
      "namaPadukuhan",
      "alamat",
      "telepon",
      "whatsapp",
      "email",
      "maps",
      "jamPelayanan",
      "mediaSosial",
    ],
    jsonFields: ["mediaSosial"],
  },
};

function doGet(e) {
  try {
    const resource = getParam(e, "resource");
    const action = getParam(e, "action") || "list";

    if (action !== "list") {
      return jsonResponse(false, "Action GET tidak valid.", null);
    }

    if (resource === "site") {
      return jsonResponse(true, "Data berhasil dimuat.", {
        profil: getSingleton("profil"),
        penduduk: getSingleton("penduduk"),
        umkm: listRows("umkm"),
        dokumentasi: listRows("dokumentasi"),
        video: getSingleton("video"),
      });
    }

    const config = getConfig(resource);
    const data = config.type === "collection" ? listRows(resource) : getSingleton(resource);

    return jsonResponse(true, "Data berhasil dimuat.", data);
  } catch (error) {
    return jsonResponse(false, getErrorMessage(error), null);
  }
}

function doPost(e) {
  try {
    const body = parseBody(e);
    const resource = body.resource || getParam(e, "resource");
    const action = body.action || getParam(e, "action");
    const id = body.id || getParam(e, "id");
    const data = body.data || {};

    if (action === "create") {
      return jsonResponse(true, "Data berhasil dibuat.", createRow(resource, data));
    }

    if (action === "update") {
      return jsonResponse(true, "Data berhasil diperbarui.", updateRow(resource, id, data));
    }

    if (action === "delete") {
      return jsonResponse(true, "Data berhasil dihapus.", deleteRow(resource, id));
    }

    return jsonResponse(false, "Action POST tidak valid.", null);
  } catch (error) {
    return jsonResponse(false, getErrorMessage(error), null);
  }
}

function createRow(resource, data) {
  const config = getConfig(resource);

  if (config.type !== "collection") {
    throw new Error("Resource ini hanya dapat diperbarui.");
  }

  const sheet = getSheet(resource);
  const payload = Object.assign({}, data, {
    id: data.id || `${resource}-${Date.now()}`,
    createdAt: data.createdAt || new Date().toISOString(),
  });

  sheet.appendRow(config.headers.map((header) => serializeValue(payload[header], config, header)));

  return payload;
}

function updateRow(resource, id, data) {
  const config = getConfig(resource);

  if (config.type === "singleton") {
    return upsertSingleton(resource, data);
  }

  if (!id) {
    throw new Error("ID wajib dikirim untuk update.");
  }

  const sheet = getSheet(resource);
  const rows = sheet.getDataRange().getValues();
  const headers = rows[0];
  const idIndex = headers.indexOf("id");

  for (let index = 1; index < rows.length; index += 1) {
    if (String(rows[index][idIndex]) === String(id)) {
      const current = rowToObject(rows[index], config);
      const payload = Object.assign({}, current, data, { id });
      sheet
        .getRange(index + 1, 1, 1, config.headers.length)
        .setValues([config.headers.map((header) => serializeValue(payload[header], config, header))]);

      return payload;
    }
  }

  throw new Error("Data tidak ditemukan.");
}

function deleteRow(resource, id) {
  const config = getConfig(resource);

  if (config.type !== "collection") {
    throw new Error("Resource ini tidak mendukung delete.");
  }

  if (!id) {
    throw new Error("ID wajib dikirim untuk delete.");
  }

  const sheet = getSheet(resource);
  const rows = sheet.getDataRange().getValues();
  const headers = rows[0];
  const idIndex = headers.indexOf("id");

  for (let index = 1; index < rows.length; index += 1) {
    if (String(rows[index][idIndex]) === String(id)) {
      sheet.deleteRow(index + 1);
      return { id };
    }
  }

  throw new Error("Data tidak ditemukan.");
}

function listRows(resource) {
  const config = getConfig(resource);
  const sheet = getSheet(resource);
  const rows = sheet.getDataRange().getValues();

  return rows.slice(1).filter(rowHasValue).map((row) => rowToObject(row, config));
}

function getSingleton(resource) {
  const config = getConfig(resource);
  const sheet = getSheet(resource);
  const rows = sheet.getDataRange().getValues();
  const row = rows.slice(1).find(rowHasValue);

  if (!row) {
    return {};
  }

  return rowToObject(row, config);
}

function upsertSingleton(resource, data) {
  const config = getConfig(resource);
  const sheet = getSheet(resource);
  const rows = sheet.getDataRange().getValues();
  const rowIndex = rows.slice(1).findIndex(rowHasValue);
  const values = config.headers.map((header) => serializeValue(data[header], config, header));

  if (rowIndex === -1) {
    sheet.appendRow(values);
  } else {
    sheet.getRange(rowIndex + 2, 1, 1, config.headers.length).setValues([values]);
  }

  return data;
}

function getSheet(resource) {
  const config = getConfig(resource);
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(config.sheetName);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(config.sheetName);
  }

  ensureHeaders(sheet, config.headers);
  return sheet;
}

function ensureHeaders(sheet, headers) {
  const range = sheet.getRange(1, 1, 1, headers.length);
  const current = range.getValues()[0];
  const shouldWrite = headers.some((header, index) => current[index] !== header);

  if (shouldWrite) {
    range.setValues([headers]);
  }
}

function rowToObject(row, config) {
  return config.headers.reduce((result, header, index) => {
    result[header] = parseValue(row[index], config, header);
    return result;
  }, {});
}

function serializeValue(value, config, header) {
  if (config.jsonFields.indexOf(header) >= 0) {
    return JSON.stringify(value || (header === "misi" || header === "struktur" ? [] : {}));
  }

  return value == null ? "" : value;
}

function parseValue(value, config, header) {
  if (config.jsonFields.indexOf(header) >= 0) {
    if (!value) {
      return header === "misi" || header === "struktur" ? [] : {};
    }

    try {
      return JSON.parse(value);
    } catch {
      return header === "misi" || header === "struktur" ? [] : {};
    }
  }

  if (["tahun", "jumlahPenduduk", "lakiLaki", "perempuan", "kk", "rt", "rw"].indexOf(header) >= 0) {
    return Number(value || 0);
  }

  return value == null ? "" : String(value);
}

function rowHasValue(row) {
  return row.some((cell) => cell !== "" && cell != null);
}

function parseBody(e) {
  if (!e || !e.postData || !e.postData.contents) {
    return {};
  }

  return JSON.parse(e.postData.contents);
}

function getParam(e, key) {
  return e && e.parameter ? e.parameter[key] : "";
}

function getConfig(resource) {
  const config = CONFIG[resource];

  if (!config) {
    throw new Error("Resource tidak valid.");
  }

  return config;
}

function jsonResponse(success, message, data) {
  return ContentService.createTextOutput(JSON.stringify({ success, message, data }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getErrorMessage(error) {
  return error && error.message ? error.message : "Terjadi kesalahan pada Apps Script.";
}
