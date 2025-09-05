


export const CommentComponent = ({ comment, user }) => {
    return (
        <div className="mb-4">
            {/* User name */}
            <div>
                <span className="text-sm font-medium text-darkgrey">
                    {user?.firstname || 'Unknown'} {user?.lastname || 'User'}
                </span>
            </div>
            
            {/* Comment bubble */}
            <div className="bg-green-50 border border-green-300 p-4 max-w-md">
                <p className="text-black text-sm leading-relaxed">
                    {comment}
                </p>
            </div>
        </div>
    );
}