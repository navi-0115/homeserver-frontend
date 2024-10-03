// import { useParams } from "react-router-dom";
// import { products } from "../lib/products";

// const ProductPage = () => {
//   const { id } = useParams<{ id: string }>();
//   const product = products.find((p) => p.id === id);

//   if (!product) {
//     return <p>Product not found!</p>;
//   }

//   return (
//     <div className="container mx-auto px-4">
//       <div className="flex flex-col md:flex-row">
//         <img
//           src={product.imageUrl}
//           alt={product.name}
//           className="w-full md:w-1/2"
//         />
//         <div className="md:ml-8">
//           <h1 className="text-4xl font-bold">{product.name}</h1>
//           <p className="text-gray-700 mt-4">{product.description}</p>
//           <p className="text-2xl font-semibold mt-4">${product.price}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductPage;
