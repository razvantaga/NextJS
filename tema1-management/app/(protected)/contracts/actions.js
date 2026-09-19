"use server";

import fs from "fs/promises";
import path from "path";
import { createClient } from "@/lib/supabase/server";
import { actionsLog } from "@/app/(protected)/dashboard/actions";

const filePath = path.join(process.cwd(), "lib/contracts.json");

async function uploadContractFiles(supabase, contractId, files = []) {
  if (!Array.isArray(files) || files.length === 0) {
    return [];
  }

  const uploadedFiles = [];

  for (const fileItem of files) {
    const fileToUpload = fileItem?.file ?? fileItem;

    if (!fileToUpload || typeof fileToUpload === "string") {
      if (fileItem?.path) {
        uploadedFiles.push({
          id: fileItem.id,
          name: fileItem.name,
          path: fileItem.path,
          type: fileItem.type,
          size: fileItem.size,
        });
      }
      continue;
    }

    if (!(fileToUpload instanceof File)) {
      if (fileItem?.path) {
        uploadedFiles.push({
          id: fileItem.id,
          name: fileItem.name,
          path: fileItem.path,
          type: fileItem.type,
          size: fileItem.size,
        });
      }
      continue;
    }

    const fileExtension = fileToUpload.name.split(".").pop() || "file";
    const fileName = `${crypto.randomUUID()}.${fileExtension}`;
    const filePath = `contracts/${contractId}/${fileName}`;

    const { error } = await supabase.storage
      .from("contract-files")
      .upload(filePath, fileToUpload, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Upload contract file error:", error);
      continue;
    }

    uploadedFiles.push({
      id: fileItem.id || crypto.randomUUID(),
      name: fileToUpload.name,
      path: filePath,
      type: fileToUpload.type,
      size: fileToUpload.size,
    });
  }

  return uploadedFiles;
}

async function getContracts() {
  const file = await fs.readFile(filePath, "utf-8");
  return JSON.parse(file);
}

async function saveContracts(contracts) {
  await fs.writeFile(filePath, JSON.stringify(contracts, null, 2), "utf-8");
}

// from json file
// export async function getContractData(contractId) {
//   const contracts = await getContracts();
//   const contract = contracts.find((item) => item.id === Number(contractId));

//   if (!contract) {
//     return {
//       success: false,
//       contract: null,
//       message: "Contractul nu a fost găsit.",
//     };
//   }

//   return {
//     success: true,
//     contract,
//   };
// }

// from supabase
export async function getContractData(id) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("contracts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching contract:", error);

    return {
      success: false,
      contract: null,
      message: "Contractul nu a fost găsit.",
    };
  }

  return {
    success: true,
    contract: data,
    message: "Contract găsit.",
  };
}

// from json file
// export async function addContract(data) {
//   try {
//     const file = await fs.readFile(filePath, "utf-8");

//     const contracts = JSON.parse(file);

//     const newContract = {
//       id: contracts.length + 1,

//       series: data.series,
//       cui: data.cui,

//       type: data.type,
//       status: {
//         key: "pending",
//         label: "În așteptare",
//       },

//       contractNumber: data.contractNumber,
//       datePicker: data.datePicker,
//       amount: Number(data.amount) || 0,

//       agentName: data.agentName,

//       companyName: data.companyName,
//       companyNumber: data.companyNumber,
//       companyAddress: data.companyAddress,
//       companyPhone: data.companyPhone,
//       fax: data.fax,

//       legalRepresentative: data.legalRepresentative,
//       legalRepresentativeRole: data.legalRepresentativeRole,

//       idSeries: data.idSeries,
//       idNumber: data.idNumber,
//       cnp: data.cnp,

//       phone: data.phone,
//       email: data.email,

//       invoice: data.invoice,
//       invoiceInfo: data.invoiceInfo,

//       iban: data.iban,
//       bankName: data.bankName,
//       bankLocation: data.bankLocation,

//       paymentMethod: data.paymentMethod,
//       warranties: data.warranties,

//       storeName: data.storeName,
//       storeCounty: data.storeCounty,
//       storeCity: data.storeCity,
//       storeAddress: data.storeAddress,
//       storeNumber: data.storeNumber,

//       files: data.files ?? [],
//     };

//     contracts.push(newContract);

//     await fs.writeFile(filePath, JSON.stringify(contracts, null, 2), "utf-8");

//     return {
//       success: true,
//       contract: newContract,
//       message: "Contractul a fost adăugat.",
//     };
//   } catch (error) {
//     console.error(error);

//     return {
//       success: false,
//       contract: null,
//       message: "Eroare la salvarea contractului.",
//     };
//   }
// }

// from supabase
export async function addContract(data, userId = null) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const effectiveUserId = userId ?? user?.id ?? null;

  const { data: contract, error } = await supabase
    .from("contracts")
    .insert({
      series: data.series,
      cui: data.cui,
      type: data.type,
      status: "pending",
      contract_number: data.contract_number,
      date_picker: data.date_picker,
      company_name: data.company_name,
      company_number: data.company_number,
      company_address: data.company_address,
      company_phone: data.company_phone,
      fax: data.fax,
      agent_name: data.agent_name,
      legal_representative: data.legal_representative,
      legal_representative_role: data.legal_representative_role,
      id_series: data.id_series,
      id_number: data.id_number,
      cnp: data.cnp,
      phone: data.phone,
      email: data.email,
      invoice: data.invoice,
      invoice_info: data.invoice_info,
      iban: data.iban,
      bank_name: data.bank_name,
      bank_location: data.bank_location,
      payment_method: data.payment_method,
      warranties: data.warranties,
      store_name: data.store_name,
      store_county: data.store_county,
      store_city: data.store_city,
      store_address: data.store_address,
      store_number: data.store_number,
      files: [],
    })
    .select()
    .single();

  if (error) {
    console.error("Add contract error:", error);

    return {
      success: false,
      contract: null,
      message: error.message || "Eroare la salvarea contractului.",
    };
  }

  const uploadedFiles = await uploadContractFiles(
    supabase,
    contract.id,
    data.files ?? [],
  );

  const { data: savedContract } = await supabase
    .from("contracts")
    .update({ files: uploadedFiles })
    .eq("id", contract.id)
    .select()
    .single();

  await actionsLog(
    "contract_created",
    effectiveUserId,
    contract.id,
    `Created contract ${contract.company_name || "new contract"}`,
  );

  return {
    success: true,
    contract: savedContract || contract,
    message: "Contractul a fost adăugat.",
  };
}

// from json file
// export async function updateContract(id, data) {
//   try {
//     const contracts = await getContracts();

//     const index = contracts.findIndex((item) => item.id === Number(id));

//     if (index === -1) {
//       return {
//         success: false,
//         message: "Contractul nu există",
//       };
//     }

//     const updatedContract = {
//       ...contracts[index],
//       ...data,
//       amount:
//         data.amount !== undefined
//           ? Number(data.amount) || 0
//           : contracts[index].amount,
//       id: Number(id),
//     };

//     contracts[index] = updatedContract;

//     await saveContracts(contracts);

//     return {
//       success: true,
//       contract: updatedContract,
//       message: "Contract actualizat",
//     };
//   } catch (error) {
//     console.error("Update contract error:", error);

//     return {
//       success: false,
//       message: "Eroare la actualizarea contractului",
//     };
//   }
// }

// from supabase
export async function updateContract(id, data, userId = null) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const effectiveUserId = userId ?? user?.id ?? null;

  const uploadedFiles = await uploadContractFiles(
    supabase,
    id,
    data.files ?? [],
  );

  const { data: updatedContract, error } = await supabase
    .from("contracts")
    .update({
      series: data.series,
      cui: data.cui,
      type: data.type,
      status: "pending",
      contract_number: data.contract_number,
      date_picker: data.date_picker,
      company_name: data.company_name,
      company_number: data.company_number,
      company_address: data.company_address,
      company_phone: data.company_phone,
      fax: data.fax,
      agent_name: data.agent_name,
      legal_representative: data.legal_representative,
      legal_representative_role: data.legal_representative_role,
      id_series: data.id_series,
      id_number: data.id_number,
      cnp: data.cnp,
      phone: data.phone,
      email: data.email,
      invoice: data.invoice,
      invoice_info: data.invoice_info,
      iban: data.iban,
      bank_name: data.bank_name,
      bank_location: data.bank_location,
      payment_method: data.payment_method,
      warranties: data.warranties,
      store_name: data.store_name,
      store_county: data.store_county,
      store_city: data.store_city,
      store_address: data.store_address,
      store_number: data.store_number,
      files: uploadedFiles.length > 0 ? uploadedFiles : (data.files ?? []),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Update contract error:", error);

    return {
      success: false,
      message: error.message || "Eroare la actualizarea contractului",
    };
  }

  await actionsLog(
    "contract_updated",
    effectiveUserId,
    updatedContract.id,
    `Updated contract ${updatedContract.company_name || "contract"}`,
  );

  return {
    success: true,
    contract: updatedContract,
    message: "Contract actualizat",
  };
}

// from json file
// export async function deleteContract(id) {
//   try {
//     const contracts = await getContracts();

//     const index = contracts.findIndex((item) => item.id === Number(id));

//     if (index === -1) {
//       return {
//         success: false,
//         message: "Contractul nu există",
//       };
//     }

//     const deletedContract = contracts[index];

//     contracts.splice(index, 1);

//     await saveContracts(contracts);

//     return {
//       success: true,
//       contract: deletedContract,
//       message: "Contract șters",
//     };
//   } catch (error) {
//     console.error("Delete contract error:", error);

//     return {
//       success: false,
//       message: "Eroare la ștergerea contractului",
//     };
//   }
// }

// from supabase
export async function deleteContract(id, userId = null) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const effectiveUserId = userId ?? user?.id ?? null;

  const { data: deletedContract, error } = await supabase
    .from("contracts")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Delete contract error:", error);

    return {
      success: false,
      message: error.message || "Eroare la ștergerea contractului",
    };
  }

  await actionsLog(
    "contract_deleted",
    effectiveUserId,
    deletedContract.id,
    `Deleted contract ${deletedContract.company_name || "contract"}`,
  );

  return {
    success: true,
    contract: deletedContract,
    message: "Contract șters",
  };
}
