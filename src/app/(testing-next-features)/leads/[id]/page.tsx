import ConvertLeadButton from '@/src/components/dashboard/leads/convert-lead-button';

const LeadDetailsPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Lead Details</h1>
      {/* Render Lead Details here */}
      <ConvertLeadButton leadId={id} />
    </div>
  );
};

export default LeadDetailsPage;
