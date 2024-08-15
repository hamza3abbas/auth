import CustomerDetails from "@/src/components/dashboard/customers/customer-details";
import CustomerUpdateForm from "@/src/components/dashboard/customers/customer-update-form";
import DeleteCustomerButton from "@/src/components/dashboard/customers/delete-customer-button";

const CustomerPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Customer Details</h1>
      <CustomerDetails customerId={id} />
      <CustomerUpdateForm customerId={id} />
      <DeleteCustomerButton customerId={id} />
    </div>
  );
};

export default CustomerPage;
