const BlogCard = ({blogTitle}) => {
    const img1 = "https://plus.unsplash.com/premium_photo-1670871853624-87056a19a28f?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    return ( 
        <div className="bg-white rounded-lg overflow-hidden">
          <div className="w-64 lg:w-full h-[150px] overflow-hidden">
            <img src={img1} alt="" className="h-full w-full object-cover"/>
          </div>
          <div className="p-4">
              <div className="line-clamp-2"> {blogTitle} </div>
          </div>
        </div>
     );
}
 
export default BlogCard;