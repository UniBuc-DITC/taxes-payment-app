import Navbar from "@/components/navbar";
import AddAccount from "@/components/forms/admin/addAccount";

export default async function Add() {

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <AddAccount />
    </div>
  );
}
