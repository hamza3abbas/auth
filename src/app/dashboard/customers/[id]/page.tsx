import CustomerDetails from "@/src/components/dashboard/customers/customer-details";
import CustomerUpdateForm from "@/src/components/dashboard/customers/customer-update-form";
import DeleteCustomerButton from "@/src/components/dashboard/customers/delete-customer-button";
import DynamicBreadcrumbs from "@/src/components/dashboard/dynamic-bread-crumbs";

const CustomerPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return (
   
    <>
      <DynamicBreadcrumbs/>
      <CustomerUpdateForm customerId={id} />
      <DeleteCustomerButton customerId={id} />
      </>
    
  );
};

export default CustomerPage;
