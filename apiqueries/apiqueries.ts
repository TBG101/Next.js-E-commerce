export async function getProduct(slug: string) {
  const res = await fetch(`/api/products/${slug}`, {
    method: "GET",
    cache: "no-cache",
  });

  const result = await res.json();
  return result;
}

export async function getCart() {
  const res = await fetch(`/api/cart`, {
    method: "GET",
    cache: "no-cache",
  });

  const result = await res.json();
  return result;
}

export async function getProducts({ maxProducts, sex }: { maxProducts?: number, sex?: string } = {}) {
  let url = `/api/products`;
  const params = new URLSearchParams();

  if (maxProducts) {
    params.append('maxProducts', maxProducts.toString());
  }

  if (sex) {
    params.append('sex', sex);
  }

  if (params.toString()) {
    url += `?${params.toString()}`;
  }

  const res = await fetch(url, {
    method: "GET",
    cache: "no-cache",
  });

  const result = await res.json();
  return result;
}

export async function searchProducts(search: string) {
  search = encodeURIComponent(search);
  console.log(search);
  const res = await fetch(`/api/products/search?search=${search}`, {
    method: "GET",
    cache: "no-cache",
  });
  const result = await res.json();
  if (res.ok)
    return result;
  else
    throw new Error(result.message);
}

export async function registerAccount(email: string, password: string, name: string) {
  const response = await fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, name }),
  });
  const result = await response.json();
  if (response.ok)
    return result;
  else
    throw new Error(result.message);
}