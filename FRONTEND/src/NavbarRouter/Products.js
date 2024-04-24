import { useEffect, useState } from "react";

const Products = () => {
   const [AllProducts, setAllProducts] = useState([]);
    const ProductHandler = async() => {
       let Products = await fetch('http://localhost:10101/products');
       Products = await Products.json();
       setAllProducts(Products);
       console.log(AllProducts)
    }
    useEffect( () => {
       ProductHandler();
    },[])

       async function DeleteHandler(index){
          if(AllProducts.length>0) {
            await fetch(`http://localhost:10101/products/${index}`,
            {
               method: 'delete'
            }
         );
         alert("Deleted!!");
         ProductHandler();
          }
      } 
    return (
       <div className="procuctlist">
          <h1>Product List</h1>
          {
           AllProducts.length> 0?
            <table>
            <thead>   
             <tr>
               <th>S.No.</th>
               <th>Name</th>
               <th>Price</th>
               <th>Category</th>
               <th>Company</th>
               <th>Delete</th>
             </tr>
             </thead>
             <tbody>
             {
               AllProducts.map((data, index) =>
                   <tr>
                     <td>{index+1}</td>
                     <td>{data.Name}</td>
                     <td>{data.Price}</td>
                     <td>{data.Category}</td>
                     <td>{data.Company}</td>
                     <td key={data._id}>
                         <button onClick={ () => DeleteHandler(data._id)}>Delete</button>
                     </td>
                   </tr> 
               )  
             }
             </tbody>  
           </table>:
           <>
                <br/><br/><br/>
                <h3>No Product</h3>
           </>
          }
       </div>
    );
  }
  
  export default Products;