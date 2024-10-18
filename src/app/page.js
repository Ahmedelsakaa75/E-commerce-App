import Image from "next/image";

export default async function Home() {
  const res = await fetch('https://fakestoreapi.com/products');
  const products = await res.json();

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <Image width={100} height={100} src={product.image} alt={product.title} className="w-full h-56 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{product.title}</h3>
              <p className="mt-2 text-gray-600">{product.description.substring(0, 100)}...</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-green-600 font-bold">${product.price}</span>
                <span className="text-yellow-500">{'★'.repeat(Math.round(product.rating.rate))}</span>
              </div>
              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-500 transition-colors">View Product</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
