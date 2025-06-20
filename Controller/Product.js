import { CartModel } from "../modules/CartModel.js";
import { ProductModel } from "../modules/ProductModel.js"
import axios from "axios";


export const AddProduct = async (req, res) => {
    try {
        // console.log(req.body, "this is all product addding");

        const data = await ProductModel.create({ ...req.body, user: req.user.userId })

        return res.send({ message: "Product Add successfully", data: data })
    }
    catch (error) {
        return res.send(error)
    }

}
export const All_product = async (req, res) => {
    try {
      const { category } = req.query;
  let products;

  if (category) {
    products = await ProductModel.find({ category: category });
  } else {
    products = await ProductModel.find();
  }

  if (products.length === 0) {
    return res.status(200).json({ data: [] }); // 👈 empty but no error
  }

  return res.status(200).json({ data: products });
        }
        
        // Get all products
        const data = await ProductModel.find().lean();
        return res.status(200).json({ 
            success: true,
            message: "All products fetched",
            data: data 
        });

    } catch (err) {
        console.error("Product fetch error:", err);
        return res.status(500).json({ 
            success: false,
            message: "Server error occurred",
            error: err.message 
        });
    }
}
export const Del = async (req, res) => {
    try {
        const { id } = req.params

        const data = await ProductModel.findByIdAndDelete(id)
        res.status(200).json({ message: data })
    } catch (error) {
        return res.status(500).send({ message: "Something went wrong", error: err });
    }

}
export const edite_get = async (req, res) => {
    try {
        const { id } = req.params

        const data = await ProductModel.findById(id)
        // console.log(data);

        res.status(200).json({ message: data })
    } catch (error) {
        return res.status(500).send({ message: "Something went wrong", error: err });
    }

}

export const edite_post = async (req, res) => {
    const { id } = req.params
    const message = await ProductModel.findByIdAndUpdate(id, req.body)
    res.status(200).json({ message: message })

}
// export const Prouduct_Filter = async (req, res) => {
//     const { category } = req.query
//     console.log(category);
//     const data = await ProductModel.find({ category: category })


// }

export const cart = async (req, res) => {
    const userId = req.user.userId;
    const { Product, quantity } = req.body;

    try {

        const exist = await CartModel.findOne({
            "Product._id": Product._id,
            user: userId
        });

        if (exist) {

            const updated = await CartModel.findByIdAndUpdate(
                exist._id,
                { $inc: { quantity: quantity || 1 } },
                { new: true }
            );

            return res.status(200).send({
                message: "Product quantity updated in cart",
                data: updated
            });

        } else {

            const newCart = await CartModel.create({
                Product,
                quantity: quantity || 1,
                user: userId
            });

            return res.status(201).send({
                message: "Product added to cart",
                data: newCart
            });
        }

    } catch (error) {
        console.error("Error in cart controller:", error);
        return res.status(500).send({ message: "Internal Server Error", error });
    }
};


export const singlepage = async (req, res) => {
    const { id } = req.params
    // console.log(id);
    const data = await ProductModel.findById(id)

    res.json(data)


}

export const cart_particular = async (req, res) => {
    const userId = req.user.userId;

    try {
        const cartData = await CartModel.find({ user: userId })

        res.status(200).send({
            message: "User specific cart fetched",
            data: cartData
        });
    } catch (err) {
        console.error("Error fetching cart:", err);
        res.status(500).send({ message: "Internal Server Error", error: err });
    }
};



export const cart_remove = async (req, res) => {
    const { id } = req.params;
    try {
        const cartData = await CartModel.findByIdAndDelete(id);
        if (!cartData) {
            return res.status(404).json({ message: "Cart item not found" });
        }
        res.status(200).json({
            message: "Delete Cart Item",
            data: cartData
        });
    } catch (err) {
        console.error("Delete Cart Item:", err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }
};



export const chatbot = async (req, res) => {
    const { message } = req.body;

    try {
        const response = await axios.post(
            "https://api.mistral.ai/v1/chat/completions",
            {
                model: "mistral-tiny",
                messages: [{ role: "user", content: message }],
            },
            {
                headers: {
                    Authorization: `Bearer Q3pePoEx6j2jo9oyAYxg3FQ4z39JqA2s`,
                    "Content-Type": "application/json",
                },
            }
        );

        const reply = response.data.choices[0].message.content;
        res.json({ reply });
    } catch (error) {
        console.error("❌ Mistral Error:", error.response?.data || error.message);
        res.status(500).json({ error: "AI API call failed." });
    }
};
