import { useState } from "react";
import { useAuth } from "../providers/auth.provider";

export const CreateCommentComponent = ({ productId, onCommentCreated }) => {
    const [comment, setComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { loginData } = useAuth();


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!comment.trim() || isSubmitting) return;

        const token = loginData.accessToken
        console.log('Token:', token);

        if (!token) {
            alert("Du skal være logget ind for at kommentere.");
            return;
        }

        setIsSubmitting(true);
        
        try {
            const response = await fetch('http://localhost:3000/api/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    comment: comment.trim(),
                    productId: parseInt(productId)
                })
            });

            console.log('Response status:', response.status);
            
            if (response.ok) {
                const newComment = await response.json();
                setComment(""); // Clear the textarea after successful submission
                
                // Call callback function if provided (to refresh comments list)
                if (onCommentCreated) {
                    onCommentCreated(newComment);
                }
                
                alert("Kommentar sendt!");
            } else {
                const errorData = await response.text();
                console.log('Error response:', errorData);
                throw new Error(`HTTP ${response.status}: ${errorData}`);
            }
        } catch (error) {
            console.error("Error creating comment:", error);
            alert("Der opstod en fejl ved afsendelse af kommentaren. " + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full">
            {/* Header */}
            <h2 className="text-2xl font-medium text-lightgreen mb-6 text-center">
                Kontakt sælger
            </h2>
            
            {/* Form */}
            <form onSubmit={handleSubmit} className="relative">
                {/* Text Area */}
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Skriv en besked til sælger....."
                    className="w-full h-40 p-4 border-2 border-lightgreen resize-none focus:outline-none focus:darkgreen text-black  placeholder-gray-500"
                    rows={6}
                />
                
                {/* Send Button */}
                <div className="flex justify-end mt-4">
                    <button
                        type="submit"
                        disabled={!comment.trim() || isSubmitting}
                        className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                    >
                        {isSubmitting ? "Sender..." : "send"}
                    </button>
                </div>
            </form>
        </div>
    );
};