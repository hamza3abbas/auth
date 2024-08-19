import DeletePostButton from "@/src/components/dashboard/cms/delete-button-button";
import PostUpdateForm from "@/src/components/dashboard/cms/post-update-form";
import DynamicBreadcrumbs from "@/src/components/dashboard/dynamic-bread-crumbs";

const SinglePostPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return (
   
    <>
      <DynamicBreadcrumbs/>
      <PostUpdateForm postId={id} />
      <DeletePostButton postId={id} />
      </>
    
  );
};

export default SinglePostPage;
