interface Product {
    id: string;
    name: string;
    description: string;
    images: string[]
    default_price: {
      unit_amount_decimal: number;
      id: string;
    };
  }
  
  interface CartItem extends Product {
    quantity: number;
  }
  
  interface ICartContext {
    cart: CartItem[],
    addToCart: (product: Product) => void
  }

  