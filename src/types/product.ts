export interface Product {
    id: string | number;
    title: string;
    description: string;
    category: string;
    price: number;
    rating: number;
    images: string[];
    
    
    availabilityStatus?: string;
    brand?: string;
    dimensions?: {
        width: number;
        height: number;
        depth: number;
    };
    discountPercentage?: number;
    meta?: {
        createdAt: string;
        updatedAt: string;
        barcode: string;
    };
    minimumOrderQuantity?: number;
    returnPolicy?: string;
    reviews?: {
        rating: number;
        comment: string;
        date: string;
        reviewerName: string;
        reviewerEmail: string;
    }[];
    shippingInformation?: string;
    sku?: string;
    stock?: number;
    tags?: string[];
    thumbnail?: string;
    warrantyInformation?: string;
    weight?: number;
}