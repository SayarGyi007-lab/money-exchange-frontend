import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useCreateUser from "../../../hooks/users/createUser";

function RecordUser() {
  const { register, userData, error, loading } = useCreateUser();
  const navigate = useNavigate();

  const [formFields, setFromFields] = useState({
    bankOwnerName: "",
    accountNumber: "",
    bankName: "",
    fromCurrency: "",
    toCurrency: "",
    amount: "",
  });
  const [paymentSlip, setPaymentSlip] = useState(null);
  const [bankQr, setBankQr] = useState(null);

  useEffect(() => {
    if (userData) {
      navigate("/pending", { state: { userId: userData._id || userData.id } });
    }
  }, [userData, navigate]);

  const handleChange = (e) => {
    setFromFields({
      ...formFields,
      [e.target.name]: e.target.value.toUpperCase(),
    });
  };

  const handleFileChange = (e) => {
    if (e.target.name === "bankQr") {
      setBankQr(e.target.files[0]);
    } else if (e.target.name === "slipImage") {
      setPaymentSlip(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!paymentSlip) {
      alert("Please upload a payment slip before submitting.");
      return;
    }

    const data = new FormData();
    Object.entries(formFields).forEach(([key, value]) => {
      data.append(key, value);
    });

    if (bankQr) data.append("bankQr", bankQr);
    data.append("slipImage", paymentSlip);

    await register(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white/70 backdrop-blur-xl shadow-xl rounded-3xl p-8 space-y-6 hover:shadow-2xl transition"
      >
        <h2 className="text-3xl font-bold text-center text-indigo-600">
          📝 Register User
        </h2>
        <p className="text-red-500 text-md text-center">
          Please fill in your bank details to transfer money
        </p>

        {/* Dynamic Fields */}
        {[
          { name: "bankOwnerName", label: "Bank Owner Name" },
          { name: "accountNumber", label: "Account Number", type: "number" },
          { name: "bankName", label: "Bank Name" },
          { name: "fromCurrency", label: "From Currency" },
          { name: "toCurrency", label: "To Currency" },
          { name: "amount", label: "Amount (To Currency)", type: "number" },
        ].map(({ name, label, type = "text" }) => (
          <div key={name}>
            <label
              htmlFor={name}
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              {label}
            </label>
            <input
              id={name}
              type={type}
              name={name}
              value={formFields[name]}
              onChange={handleChange}
              placeholder={label}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
              {...(type === "number"
                ? {
                    onWheel: (e) => e.currentTarget.blur(),
                    onKeyDown: (e) => {
                      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                        e.preventDefault();
                      }
                    },
                    style: { MozAppearance: "textfield" },
                  }
                : {})}
            />
          </div>
        ))}

        {/* Slip Image */}
        <div>
          <label
            htmlFor="slipImage"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Upload Slip Image
          </label>
          <input
            id="slipImage"
            type="file"
            name="slipImage"
            onChange={handleFileChange}
            className="w-full border border-gray-300 rounded-xl file:px-4 file:py-2 file:border-0 file:bg-indigo-100 file:text-indigo-700 file:rounded-md cursor-pointer shadow-sm"
          />
        </div>

        {/* Bank QR */}
        <div>
          <label
            htmlFor="bankQr"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Upload Bank QR
          </label>
          <input
            id="bankQr"
            type="file"
            name="bankQr"
            onChange={handleFileChange}
            className="w-full border border-gray-300 rounded-xl file:px-4 file:py-2 file:border-0 file:bg-indigo-100 file:text-indigo-700 file:rounded-md cursor-pointer shadow-sm"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 text-lg font-semibold rounded-xl bg-indigo-600 text-white shadow-md hover:bg-indigo-700 hover:scale-[1.02] transition disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        {/* Error */}
        {error && (
          <p className="text-red-600 text-center font-medium">
            {error.message || String(error)}
          </p>
        )}
      </form>
    </div>
  );
}

export default RecordUser;

