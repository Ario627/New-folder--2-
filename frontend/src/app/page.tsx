import {fetchWithRedisCache} from '@/services/fetchWithCache';

async function getProducts() {
  return fetchWithRedisCache('produts', async() => {
    const res = await fetch('https://api.escuelajs.co/api/v1/products?limit=10');
    return res.json();
  }, {ttl: 60 * 60});
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <div className='p-8'>
      <h1 className='text-2xl font-bold mb-4'>Product List</h1>
      <div className='grid grid-cols-3 gap-3'>
        {products.map((product: any) => (
          <div key={product.id}>
            <img src={product.images[0]} alt={product.title} className="w-full h-48 object-cover" />
            <h3 className="font-semibold">{product.title}</h3>
            <p className="text-green-600 font-bold">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

