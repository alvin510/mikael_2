import { useState } from "react";
import axios from "axios";

const ProfileContent = () => {
  const [nama, setNama] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [profile, setProfile] = useState("");
  const [otherJabatan, setOtherJabatan] = useState("");
  const [keteranganPastor, setKeteranganPastor] = useState("");
  const [sejarah, setSejarah] = useState(""); // Menambah state untuk sejarah
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [showErrorNotification, setShowErrorNotification] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nama || !jabatan || !keterangan || !profile || !sejarah) {
      // Menambah validasi untuk sejarah
      setShowErrorNotification(true);
      setTimeout(() => {
        setShowErrorNotification(false);
      }, 3000);
      return; // Stop the execution of the function if any field is empty
    }
    try {
      const formData = new FormData();
      formData.append("nama", nama);
      formData.append("jabatan", jabatan);
      formData.append("keterangan", keterangan);
      formData.append("profile", profile);
      formData.append("sejarah", sejarah); // Menambahkan sejarah ke FormData

      const response = await axios.post("/api/add-profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      setShowSuccessNotification(true);
      setTimeout(() => {
        setShowSuccessNotification(false);
      }, 3000);
      // Reset form fields after successful submission
      setNama("");
      setJabatan("");
      setKeterangan("");
      setProfile("");
      setSejarah(""); // Reset juga state untuk sejarah
    } catch (error) {
      console.log(error);
      setShowErrorNotification(true);
      setTimeout(() => {
        setShowErrorNotification(false);
      }, 3000);
    }
  };

  return (
    <>
      <div className="bg-gray-200 min-h-screen overflow-auto">
        <h1 className="text-2xl font-semibold ml-8 mt-5">Profile</h1>
        <div className="p-8 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full ">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-wrap mb-4">
                <div className="w-full md:w-1/2 md:pr-2">
                  <label
                    htmlFor="nama"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Nama:
                  </label>
                  <input
                    type="text"
                    id="nama"
                    name="nama"
                    placeholder="Masukkan Nama"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="w-full md:w-1/2 md:pl-2">
                  <label
                    htmlFor="jabatan"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Jabatan:
                  </label>
                  <select
                    id="jabatan"
                    name="jabatan"
                    value={jabatan}
                    onChange={(e) => setJabatan(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                  >
                    <option value="" disabled>
                      Pilih Jabatan
                    </option>
                    <option value="pastor">Pastor</option>
                    <option value="lainnya">Lainnya</option>
                  </select>

                  {jabatan === "lainnya" && (
                    <div className="mt-4">
                      <label
                        htmlFor="otherJabatan"
                        className="block text-gray-700 font-bold mb-2"
                      >
                        Jabatan Lainnya:
                      </label>
                      <input
                        type="text"
                        id="otherJabatan"
                        name="otherJabatan"
                        value={otherJabatan}
                        onChange={(e) => setOtherJabatan(e.target.value)}
                        placeholder="Masukkan Jabatan Lainnya"
                        className="w-full p-2 border rounded"
                        required
                      />
                    </div>
                  )}

                  {jabatan === "pastor" && (
                    <div className="mt-4">
                      <label
                        htmlFor="keteranganPastor"
                        className="block text-gray-700 font-bold mb-2"
                      >
                        Keterangan Pastor:
                      </label>
                      <input
                        type="text"
                        id="keteranganPastor"
                        name="keteranganPastor"
                        value={keteranganPastor}
                        onChange={(e) => setKeteranganPastor(e.target.value)}
                        placeholder="Masukkan Keterangan Pastor"
                        className="w-full p-2 border rounded"
                        required
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap mb-4">
                <div className="w-full md:w-1/2 md:pr-2">
                  <label
                    htmlFor="keterangan"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Keterangan:
                  </label>
                  <textarea
                    id="keterangan"
                    name="keterangan"
                    placeholder="Masukkan judul"
                    value={keterangan}
                    onChange={(e) => setKeterangan(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="w-full md:w-1/2 md:pl-2">
                  <label
                    htmlFor="profile"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Profile:
                  </label>
                  <input
                    type="file"
                    id="profile"
                    name="profile"
                    onChange={(e) => setProfile(e.target.files[0])}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-wrap mb-4">
                <div className="w-full">
                  <label
                    htmlFor="sejarah"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Sejarah:
                  </label>
                  <textarea
                    id="sejarah"
                    name="sejarah"
                    placeholder="Masukkan sejarah"
                    value={sejarah}
                    onChange={(e) => setSejarah(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>

      {showSuccessNotification && (
        <div className="absolute top-0 right-0 m-4 p-4 bg-green-500 text-white rounded">
          Notifikasi berhasil disimpan!
        </div>
      )}
      {/* Notifikasi Gagal */}
      {showErrorNotification && (
        <div className="absolute top-0 right-0 m-4 p-4 bg-red-500 text-white rounded">
          Mohon lengkapi semua data sebelum menyimpan.
        </div>
      )}
    </>
  );
};

export default ProfileContent;
