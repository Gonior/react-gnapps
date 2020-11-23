export const getDataCategories = async (cb, cl) => {
  let url = "http://localhost:8000/api/admin/categories";
  let res = await fetch(url, {
    headers: {
      Authorization: JSON.parse(localStorage.token)
    }
  });
  if (res.ok) {
    if (!cl) {
      let json = await res.json();
      cb([...json]);
    }
  }
};

export const getDataMenus = async (cb, cl) => {
  let res = await fetch("http://localhost:8000/api/admin/menus/", {
    headers: {
      Authorization: JSON.parse(localStorage.token)
    }
  });
  if (res.ok) {
    if (!cl) {
      let json = await res.json();
      cb([...json]);
    }
  }
};
