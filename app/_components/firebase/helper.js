import { db } from "./firebase";
import { collection, getDocs, query, where, doc, getDoc, limit, snapshot, startAfter, endBefore, orderBy,data } from "firebase/firestore";
let lastVisible = null;
let pagelimit = 4;

const getSort = (sort) => {
    sort = parseInt(sort, 10); // Convert to integer
    if (sort === 1) {
        return `orderBy('name','asc')`;
    } 
    else if (sort === 2) {
        return String("orderBy('name','desc')");
    }
    else if (sort === 3) {
        return String("orderBy('price','asc')");
    }
    else if (sort === 4) {
        return String("orderBy('price','desc')");
    }

    
};
export const fetchProductFirst = async (categoryId,pagelimit,sort) => {
    try {
        // let categoryId = 2;
           // let sorta = getSort(sort);
      
        let sortStr = getSort(sort);
       // console.log(categoryId);
        const productsCollection = collection(db, "products");

        const categoryRef = doc(db, "category", categoryId.toString());  // Reference to category document

        // Step 2: Reference to the products collection
        const q = query(productsCollection,
            where("category", "==", categoryRef),
            orderBy(sort.name,sort.direction),
            limit(pagelimit),
        );
        const productsnapshot = await getDocs(q);
        if (!productsnapshot.empty) {
            //const categoryData = await getCategoryById(categoryId)
            const categoryDetail = await getCategoryById(categoryId);
            lastVisible = productsnapshot.docs[productsnapshot.docs.length - 1];
            const products = productsnapshot.docs.map((doc) => ({
                id: doc.id,  // Product ID
                ...doc.data(),  // Product details
                category: categoryDetail,
            }));

          //  console.log(products);
            return products;  // Log the fetched products
        }



        // return products;  // Return the products
    } catch (error) {
        console.error("Error fetching products by category:", error);
        return [];
    }

}


export const fetchProductNext = async (categoryId,pagelimit,sort) => {
    try {
         //let categoryId = 2;
        
      // console.log("In next ", sort)
        const productsCollection = collection(db, "products");

        const categoryRef = doc(db, "category", categoryId.toString());  // Reference to category document

        // Step 2: Reference to the products collection
        // const q = query(productsCollection,
        //     where("category", "==", categoryRef),
        //     orderBy(sort), // Second field in your index
        //     startAfter(lastVisible), // Start after the last document of the previous query
        //     limit(pagelimit));

            const q = query(productsCollection,
                where("category", "==", categoryRef),
                orderBy(sort.name,sort.direction),
                startAfter(lastVisible),
                limit(pagelimit),
            );
        const productsnapshot = await getDocs(q);
        if (!productsnapshot.empty) {
            //const categoryData = await getCategoryById(categoryId)
            const categoryDetail = await getCategoryById(categoryId);
            lastVisible = productsnapshot.docs[productsnapshot.docs.length - 1];
            //const secondLastDocument = docs.length > 1 ? docs[docs.length - 2] : null;
           // console.log("last visible",lastVisible);
            const products = productsnapshot.docs.map((doc) => ({
                id: doc.id,  // Product ID
                ...doc.data(),  // Product details
                category: categoryDetail,
            }));

           // console.log("Next Page Products :", products);  // Log the fetched products
            return products;
        }
        return [];



        // return products;  // Return the products
    } catch (error) {
        console.error("Error fetching products by category:", error);
        return [];
    }

}

export const fetchProductPrev = async (categoryId,pagelimit,sort) => {
    try {
        // let categoryId = 2;
        const productsCollection = collection(db, "products");

        const categoryRef = doc(db, "category", categoryId.toString());  // Reference to category document

        // Step 2: Reference to the products collection
        const q = query(productsCollection,
            where("category", "==", categoryRef),
            orderBy("price", "asc"), // Second field in your index
            endBefore(lastVisible), // Start after the last document of the previous query
            limit(pagelimit));
        const productsnapshot = await getDocs(q);
        if (!productsnapshot.empty) {
            //const categoryData = await getCategoryById(categoryId)
            const categoryDetail = await getCategoryById(categoryId);
            lastVisible = productsnapshot.docs[productsnapshot.docs.length - 1];
            const products = productsnapshot.docs.map((doc) => ({
                id: doc.id,  // Product ID
                ...doc.data(),  // Product details
                category: categoryDetail,
            }));

            //  console.log("Previous Page Products :",products);  // Log the fetched products
            return products;
        }
        return [];



        // return products;  // Return the products
    } catch (error) {
        console.error("Error fetching products by category:", error);
        return [];
    }

}


export const getCategoryById = async (categoryId) => {
    try {
        // Reference to the specific category document
       //console.log("THis is category",categoryId);
        const categoryRef = doc(db, "category", categoryId.toString());
        const categorySnap = await getDoc(categoryRef);

        if (!categorySnap.exists()) {
            throw new Error(`Category with ID ${categoryId} does not exist.`);
        }

        // Fetch category data
        const categoryData = { id: categorySnap.id, ...categorySnap.data() };
        return categoryData;
    }
    catch (error) {

    }
}

export const getProductBySlug = async (slug) => {
   // const { slug } = req.query; // Get the slug from the query parameters

  try {
    // Query the 'products' collection for a document with the matching slug
    const productsQuery = query(
      collection(db, "products"),
      where("slug", "==", slug)
    );

    // Fetch the document
    const productSnapshot = await getDocs(productsQuery);

    if (productSnapshot.empty) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Get the first matching document (slug should be unique)
    const productDoc = productSnapshot.docs[0];
    const productData = productDoc.data();

    // Resolve the category reference
    let categoryData = null;
    if (productData.category) {
      const categoryRef = productData.category; // Firestore document reference
      const categorySnapshot = await getDoc(categoryRef);
      if (categorySnapshot.exists()) {
        categoryData = categorySnapshot.data();
      }
    }

    // Prepare the response data
    const productWithCategory = {
      id: productDoc.id,
      ...productData,
      category: categoryData, // Attach resolved category data
    };

  //  console.log(productWithCategory); // Log the fetched product with category data
    //res.status(200).json(productWithCategory); // Send response
    return productWithCategory;
  } catch (error) {
    console.error("Error fetching product:", error);
   // res.status(500).json({ error: "Failed to fetch product" });
  }    
      }

      // fetch related products

      export const fetchRelatedProducts = async (categoryId,sort={ name: "name", direction: "asc" },pagelimit=4) => {
        {
            try {
                const categoryRef = doc(db, "category", categoryId.toString());
                const q = query(
                  collection(db, "products"),
                  where("category", "==", categoryRef),
                  orderBy(sort.name,sort.direction),
                  limit(pagelimit) // Access the 'products' collection
                );
            
                const querySnapshot = await getDocs(q);
                const products = querySnapshot.docs.map((doc) => ({
                  id: doc.id,
                  ...doc.data(),
                }));
            
                return products; // Returns an array of products
              } catch (error) {
                console.error("Error fetching products: ", error);
                return [];
              }
            }
    
    }
    

    export const fethCategory = async (slug) => {
       // console.log("FeCate id ksdfj 2323");

//  const { slug } = req.query;
    //   console.log("Caegory Iddfkdjfj");
    //     try {
    //       const q = query(collection(db, "category"), where("slug", "==", slug));
    //       const querySnapshot = await getDocs(q);
          
    //       if (!querySnapshot.empty) {
    //        // const doc = querySnapshot.docs[0];
           
    //        // res.status(200).json({ id: doc.id });
    //       } else {
    //        // res.status(404).json({ error: "Category not found" });
    //       }
    //     } catch (error) {
    //      // res.status(500).json({ error: "Failed to fetch category ID" });
    //     }

    }
    
    export const getCategoryBySlug = async (slug) => {

        
        try {
        const q = query(collection(db, "category"), where("slug", "==", slug));
        const querySnapshot = await getDocs(q);
       
        if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
          //  console.log("Does not");
            //console.log("Caegory Iddfkdjfj",{ id: doc.id });
           
            return doc.id
        // res.status(200).json({ id: doc.id });
        } else {
        // res.status(404).json({ error: "Category not found" });
        }
        } catch (error) {
        // res.status(500).json({ error: "Failed to fetch category ID" });
        }

      
      }