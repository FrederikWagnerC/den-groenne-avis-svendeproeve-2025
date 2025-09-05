import { useParams } from "react-router"
import { useState, useEffect } from "react";
import { SingleProductComponent } from "../../components/singleProduct/singleProduct.component";
import { ProductCategoryNav } from "../../components/productCategoryNav/productCategoryNav.component";
import { GreenLineComponent } from "../../components/greenLine/greenLine.component";
import { ProductComments } from "../../components/productComments/productComments.component";
import { CreateCommentComponent } from "../../components/createComment/createComment.component";
import { useFetch } from "../../utils/fetch/fetch";
import { useAuth } from "../../components/providers/auth.provider";


export const SingleProductPage = () => {
    const { productSlug } = useParams();
    const { loginData } = useAuth();
    const [comments, setComments] = useState([]);
    const [commentsLoaded, setCommentsLoaded] = useState(false);

    const {data, isLoading, error} = useFetch(`api/products/${productSlug}`);

    // Callback function to handle new comment creation
    const handleCommentCreated = (newComment) => {
        setComments(prevComments => [...prevComments, newComment]);
    };

    // Fetch comments separately when product data is available
    useEffect(() => {
        if (data && data.id && !commentsLoaded) {
            const fetchComments = async () => {
                try {
                    const response = await fetch(`http://localhost:3000/api/comments/${data.id}`);
                    if (response.ok) {
                        const fetchedComments = await response.json();
                        setComments(fetchedComments || []);
                    }
                } catch (error) {
                    console.error('Error fetching comments:', error);
                }
                setCommentsLoaded(true);
            };

            fetchComments();
        }
    }, [data, commentsLoaded]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data) return <div>No product data found</div>;


    return (
        <>
            <GreenLineComponent />
            <div className="flex flex-row">

                <ProductCategoryNav />
                <SingleProductComponent product={data} />
            </div>
            <GreenLineComponent />
            {loginData && <CreateCommentComponent productId={data.id} onCommentCreated={handleCommentCreated} />}
            <ProductComments comments={comments} isLoading={!commentsLoaded} error={null} />

        </>
    )
}
