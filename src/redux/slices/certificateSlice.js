import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../services/api/AppApi";

const initialState = {
  certificates: [],
  totalPages: null,
  certName: window.localStorage.getItem("filter-name") || null,
  tagName: window.localStorage.getItem("filter-tag") || null,
  description: window.localStorage.getItem("filter-description") || null,
  sortByCreateDate:
    window.localStorage.getItem("sort-by-create-date") || "DESC",
  sortByName: window.localStorage.getItem("sort-by-name") || null,
  pageOffset: parseInt(
    window.localStorage.getItem("home-page-offset") || 0,
    10
  ),
  pageSize: 20,
  lastScrollY: window.localStorage.getItem("last-scroll-y") || 0,
  status: "idle",
  hasMore: false,
};

export const fetchCertificates = createAsyncThunk(
  "users/fetchCertificates",
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

function setFilterValueToLocalStorage(name, value) {
  value
    ? window.localStorage.setItem(name, value)
    : window.localStorage.removeItem(name);
}

const certificatesSlice = createSlice({
  name: "certificates",
  initialState,
  reducers: {
    reloadContent(state) {
      window.localStorage.setItem("home-page-offset", 0);
      window.localStorage.setItem("last-scroll-y", 0);

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

      console.log(action.payload);

      if (sortByName) {
        window.localStorage.setItem("sort-by-name", sortByName);
        window.localStorage.removeItem("sort-by-create-date");
        state.sortByName = sortByName;
        state.sortByCreateDate = null;
      } else {
        window.localStorage.setItem(
          "sort-by-create-date",
          sortByCreateDate || "DESC"
        );
        window.localStorage.removeItem("sort-by-name");
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
        window.localStorage.setItem("home-page-offset", nextPage);
      }
    },

    pageOffsetEdited(state, action) {
      state.pageOffset = action.payload;
    },

    lastScrollYEdited(state, action) {
      state.lastScrollY = action.payload;
      window.localStorage.setItem("last-scroll-y", action.payload);
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
      });
  },
});

export const {
  filterEdited,
  lastScrollYEdited,
  incrementPage,
  reloadContent,
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
