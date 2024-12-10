import BlogCard from "../../../components/blogCard";

const EducationalResources = () => {
    return ( 
        <div className="grid gap-4">
            <div className="flex items-center justify-between">
                <div className="font-bold secondary-font">Educational resources</div>
                {/* <Link className="text-xs opacity-60">[ View all tailors ]</Link> */}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-4">
              <BlogCard blogTitle={"Beginner’s guide to mending your clothes"}/>
              <BlogCard blogTitle={"What is a capsule wardrobe? (& how to build one)"}/>
              <BlogCard blogTitle={"What do you think when you hear synthetic fabrics? (& are they sustainable?"}/>
            </div>
        </div>
     );
}
 
export default EducationalResources;