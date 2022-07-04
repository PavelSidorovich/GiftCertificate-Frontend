import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../services/api/AppApi";

const initialState = {
  certificate: null,
  certificates: [],
  totalPages: null,
  certName: window.sessionStorage.getItem("filter-name") || null,
  tagName: window.sessionStorage.getItem("filter-tag") || null,
  description: window.sessionStorage.getItem("filter-description") || null,
  sortByCreateDate:
    window.sessionStorage.getItem("sort-by-create-date") || "DESC",
  sortByName: window.sessionStorage.getItem("sort-by-name") || null,
  pageOffset: parseInt(
    window.sessionStorage.getItem("home-page-offset") || 0,
    10
  ),
  pageSize: 20,
  lastScrollY: window.sessionStorage.getItem("last-scroll-y") || 0,
  status: "idle",
  singleFetchStatus: "idle",
  controlStatus: "idle",
  hasMore: false,
};

export const fetchCertificates = createAsyncThunk(
  "certificates/fetchCertificates",
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.getCertificates(params);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response);
    }
  }
);

export const fetchCertificateById = createAsyncThunk(
  "certificates/fetchCertificateById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getCertificateById(id);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response);
    }
  }
);

export const createCertificate = createAsyncThunk(
  "certificates/createCertificate",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.createCertificate(data);
      return response;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response);
    }
  }
);

export const updateCertificate = createAsyncThunk(
  "certificates/updateCertificate",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.updateCertificate(id, data);
      return response;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response);
    }
  }
);

export const deleteCertificateById = createAsyncThunk(
  "certificates/deleteCertificateById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.deleteCertificate(id);
      return response;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response);
    }
  }
);

function setFilterValueToLocalStorage(name, value) {
  value
    ? window.sessionStorage.setItem(name, value)
    : window.sessionStorage.removeItem(name);
}

const certificatesSlice = createSlice({
  name: "certificates",
  initialState,
  reducers: {
    reloadContent(state) {
      window.sessionStorage.setItem("home-page-offset", 0);
      window.sessionStorage.setItem("last-scroll-y", 0);

      state.pageOffset = 0;
      state.lastScrollY = 0;
      state.certificates = [];
    },

    filterEdited(state, action) {
      const tagName = action.payload.tagName;
      const certName = action.payload.certName;
      const description = action.payload.description;
      const sortByCreateDate = action.payload.sortByCreateDate;
      const sortByName = action.payload.sortByName;

      state.status = "idle";
      state.certName = certName;
      state.tagName = tagName;
      state.description = description;

      if (sortByName) {
        window.sessionStorage.setItem("sort-by-name", sortByName);
        window.sessionStorage.removeItem("sort-by-create-date");
        state.sortByName = sortByName;
        state.sortByCreateDate = null;
      } else {
        window.sessionStorage.setItem(
          "sort-by-create-date",
          sortByCreateDate || "DESC"
        );
        window.sessionStorage.removeItem("sort-by-name");
        state.sortByCreateDate = sortByCreateDate || "DESC";
        state.sortByName = null;
      }

      setFilterValueToLocalStorage("filter-name", certName);
      setFilterValueToLocalStorage("filter-tag", tagName);
      setFilterValueToLocalStorage("filter-description", description);
    },

    incrementPage(state) {
      const hasMore = state.totalPages > state.pageOffset;

      state.hasMore = hasMore;
      if (hasMore) {
        const nextPage = state.pageOffset + 1;
        state.pageOffset = nextPage;
        window.sessionStorage.setItem("home-page-offset", nextPage);
      }
    },

    pageOffsetEdited(state, action) {
      state.pageOffset = action.payload;
    },

    lastScrollYEdited(state, action) {
      state.lastScrollY = action.payload;
      window.sessionStorage.setItem("last-scroll-y", action.payload);
    },

    certificateDeletedById(state, action) {
      state.certificates = state.certificates.filter(
        (cert) => cert.id !== action.payload
      );
    },

    fetchStatusEdited(state, action) {
      state.status = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCertificates.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCertificates.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.totalPages = action.payload.totalPages;
        state.certificates = [...state.certificates, ...action.payload.content];
      })
      .addCase(fetchCertificates.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.status;
      })
      .addCase(fetchCertificateById.pending, (state) => {
        state.singleFetchStatus = "loading";
      })
      .addCase(fetchCertificateById.fulfilled, (state, action) => {
        state.singleFetchStatus = "succeeded";
        state.certificate = action.payload;
      })
      .addCase(fetchCertificateById.rejected, (state, action) => {
        state.singleFetchStatus = "failed";
        state.error = action.payload.status;
      })
      .addCase(createCertificate.pending, (state) => {
        state.controlStatus = "loading";
      })
      .addCase(createCertificate.fulfilled, (state, action) => {
        state.controlStatus = "succeeded";
      })
      .addCase(createCertificate.rejected, (state, action) => {
        state.controlStatus = "failed";
        state.error = action.payload.status;
      })
      .addCase(updateCertificate.pending, (state) => {
        state.controlStatus = "loading";
      })
      .addCase(updateCertificate.fulfilled, (state, action) => {
        state.controlStatus = "succeeded";
      })
      .addCase(updateCertificate.rejected, (state, action) => {
        state.controlStatus = "failed";
        state.error = action.payload.status;
      })
      .addCase(deleteCertificateById.pending, (state) => {
        state.controlStatus = "loading";
      })
      .addCase(deleteCertificateById.fulfilled, (state, action) => {
        state.controlStatus = "succeeded";
      })
      .addCase(deleteCertificateById.rejected, (state, action) => {
        state.controlStatus = "failed";
        state.error = action.payload.status;
      });
  },
});

export const {
  filterEdited,
  lastScrollYEdited,
  incrementPage,
  reloadContent,
  certificateDeletedById,
  fetchStatusEdited,
} = certificatesSlice.actions;

export const selectFilter = (state) => {
  const filter = {};

  if (state.certificates.certName) {
    filter.certName = state.certificates.certName;
  }
  if (state.certificates.tagName) {
    filter.tagName = state.certificates.tagName;
  }
  if (state.certificates.description) {
    filter.description = state.certificates.description;
  }
  if (state.certificates.pageOffset) {
    filter.page = state.certificates.pageOffset;
  }
  if (state.certificates.pageSize) {
    filter.size = state.certificates.pageSize;
  }
  if (state.certificates.sortByName) {
    filter.sortByName = state.certificates.sortByName;
  } else {
    filter.sortByCreateDate = state.certificates.sortByCreateDate;
  }

  return filter;
};

export default certificatesSlice.reducer;
