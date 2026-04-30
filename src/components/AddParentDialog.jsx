import { useState, useEffect } from "react";
import { Plus, GraduationCap, UserCheck } from "lucide-react";
import { toast } from "@/lib/toast";
import api from "../lib/api";

const INITIAL = {
    admissionNo: "", fullName: "", className: "", stream: "", dateOfBirth: "",childAdmId:"",
    parentUserId: "", parentIdNumber: "", parentPhone: "", parentEmail: "", parentRelationship: "",
};

// // ---- Real-world validators ----
// const NAME_RE = /^[A-Za-z][A-Za-z'\-\s]{1,49}$/; // letters, spaces, ' and -, 2-50 chars
// const ADMISSION_RE = /^[A-Z]{2,4}\d{3,8}$/; // e.g. ADM2024006
// const DIGITS_ONLY_RE = /^\d+$/;
// const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// const validate = (form) => {
//     const errors = {};

//     if (!ADMISSION_RE.test(form.admissionNo.trim())) {
//         errors.admissionNo = "Admission No must be letters followed by digits (e.g. ADM2024006).";
//     }
//     if (!NAME_RE.test(form.fullName.trim())) {
//         errors.fullName = "Enter a valid full name (letters, spaces, ' or -, 2-50 chars).";
//     }
//     if (!form.className) errors.className = "Select a class.";
//     if (!form.dateOfBirth) {
//         errors.dateOfBirth = "Date of birth is required.";
//     } else {
//         const dob = new Date(form.dateOfBirth);
//         // const today = new Date();
//         // if (isNaN(dob.getTime()) || dob >= today) {
//         //     errors.dateOfBirth = "Date of birth must be in the past.";
//         // } else {
//         //     const age = (today - dob) / (1000 * 60 * 60 * 24 * 365.25);
//         //     if (age < 3 || age > 25) errors.dateOfBirth = "Age must be between 3 and 25 years.";
//         // }
//     }

//     if (!NAME_RE.test(form.parentFullName.trim())) {
//         errors.parentFullName = "Enter a valid parent name (letters only, 2-50 chars).";
//     }
//     if (!DIGITS_ONLY_RE.test(form.parentIdNumber) || form.parentIdNumber.length < 6 || form.parentIdNumber.length > 10) {
//         errors.parentIdNumber = "National ID must be 6-10 digits, numbers only.";
//     }
//     // Kenyan-style phone: digits only, 10 digits starting with 0, or 12 starting with 254
//     if (!DIGITS_ONLY_RE.test(form.parentPhone)) {
//         errors.parentPhone = "Phone must contain digits only.";
//     } else if (!(/^0\d{9}$/.test(form.parentPhone) || /^254\d{9}$/.test(form.parentPhone))) {
//         errors.parentPhone = "Enter a valid phone (e.g. 0712345678 or 254712345678).";
//     }
//     if (form.parentEmail.trim() && !EMAIL_RE.test(form.parentEmail.trim())) {
//         errors.parentEmail = "Enter a valid email containing '@' (e.g. name@example.com).";
//     }
//     if (!form.parentRelationship) errors.parentRelationship = "Select a relationship.";

//     return errors;
// };

const AddStudentDialog = () => {
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState(INITIAL);
    const [errors, setErrors] = useState({});

    const set = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    // Helpers that strip non-digits at input time
    const setDigits = (field, value) => set(field, value.replace(/\D/g, ""));

    useEffect(() => {
        if (!open) return;
        const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [open]);

    const handleSubmit = async(e) => {
        e.preventDefault();
        // const errs = validate(form);
        // setErrors(errs);
        // if (Object.keys(errs).length > 0) {
        //     toast.error("Please fix the highlighted errors", { description: "Some fields are invalid." });
        //     return;
        // }
        try{
          const resp=await api.post('/students',{
            "admissionNumber":form.admissionNo,
            "fullName":form.fullName,
            "className":form.className,
            "enrollmentYear":2026
          })
          toast.success("Student registered successfully", { description: `${resp.fullName} ` });
        setForm(INITIAL);
        setErrors({});
        setOpen(false);
        }
        catch(error){
          alert(error.message)
        }
        
    };
    const p="PAR200"
    const c="ADM200"
    const link=async(e)=>{
      e.preventDefault()
      try{
        const resp=await api.put(`/users/${p}/link-student/${c}`);
        alert("success parent linked")
        toast.success("Parent linked successfully", { description: `${form.fullName} ` });
        // setForm(INITIAL);
        // setErrors({});
        // setOpen(false);


      }
      catch(error){
        alert(alert.message)
      }
    }

    const errStyle = { color: "hsl(var(--destructive))", fontSize: "0.75rem", marginTop: "0.25rem" };

    return (<>
      <button className="btn btn-primary" onClick={() => setOpen(true)}>
        <Plus /> Add Parent
      </button>
      {open && (<div className="modal-backdrop" role="dialog" aria-modal="true" onClick={(e) => e.target === e.currentTarget && setOpen(false)}>
          <div className="modal">
            <h2><GraduationCap /> Register New Student</h2>
            {/* <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div>
                <h3 className="text-sm font-bold mb-3">Student Information</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <div className="grid grid-2">
                    <div className="field">
                      <label className="label text-xs">Admission No</label>
                      <input className="input" required placeholder="e.g. ADM2024006" value={form.admissionNo} onChange={(e) => set("admissionNo", e.target.value.toUpperCase())} maxLength={12}/>
                      {errors.admissionNo && <p style={errStyle}>{errors.admissionNo}</p>}
                    </div>
                    <div className="field">
                      <label className="label text-xs">Full Name</label>
                      <input className="input" required placeholder="e.g. John Kamau" value={form.fullName} onChange={(e) => set("fullName", e.target.value)} maxLength={50}/>
                      {errors.fullName && <p style={errStyle}>{errors.fullName}</p>}
                    </div>
                  </div>
                  <div className="grid grid-3">
                    <div className="field">
                      <label className="label text-xs">Class</label>
                      <select className="select" value={form.className} onChange={(e) => set("className", e.target.value)} required>
                        <option value="">Class</option>
                        {["Form 1N", "Form 1B", "Form 2A", "Form 2B", "Form 3A", "Form 3B", "Form 4A", "Form 4B"].map((c) => (<option key={c} value={c}>{c}</option>))}
                      </select>
                      {errors.className && <p style={errStyle}>{errors.className}</p>}
                    </div>
                    {/* <div className="field">
                      <label className="label text-xs">Stream</label>
                      <select className="select" value={form.stream} onChange={(e) => set("stream", e.target.value)}>
                        <option value="">Stream</option>
                        <option value="East">East</option>
                        <option value="West">West</option>
                        <option value="North">North</option>
                      </select>
                    </div> *
                    <div className="field">
                      <label className="label text-xs">Date of Birth</label>
                      <input className="input" required type="date" max={new Date().toISOString().split("T")[0]} value={form.dateOfBirth} onChange={(e) => set("dateOfBirth", e.target.value)}/>
                      {errors.dateOfBirth && <p style={errStyle}>{errors.dateOfBirth}</p>}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 justify-end">
                <button type="button" className="btn btn-outline" onClick={() => setOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary"><GraduationCap /> Register Student</button>
              </div>
              </form> 
              */}
              
              <form onSubmit={link} noValidate style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <hr className="divider"/>

              <div>
                <h3 className="text-sm font-bold mb-2 flex items-center gap-2">
                  <UserCheck style={{ width: "1rem", height: "1rem", color: "hsl(var(--primary))" }}/>
                  Parent / Guardian Details
                </h3>
                <p className="text-xs muted-text mb-3">
                  Required for parent portal access. These details will be verified by the Admin before the parent can log in.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <div className="grid grid-2">
                    <div className="field">
                      <label className="label text-xs">Parent Registration</label>
                      <input className="input" required placeholder="e.g. Mary Kamau" value={form.parentUserId} onChange={(e) => set("parentUserId", e.target.value)} maxLength={50}/>
                      {errors.parentUserId && <p style={errStyle}>{errors.parentUserId}</p>}
                    </div>
                    <div className="field">
                      <label className="label text-xs">Child Admission</label>
                      <input className="input" required placeholder="e.g. ADM2024006" value={form.childAdmId} onChange={(e) => set("childAdmId", e.target.value.toUpperCase())} maxLength={12}/>
                      {errors.childAdmId && <p style={errStyle}>{errors.childAdmId}</p>}
                    </div>
                    {/* <div className="field">
                      <label className="label text-xs">National ID Number</label>
                      <input className="input" required inputMode="numeric" pattern="\d*" placeholder="e.g. 12345678" value={form.parentIdNumber} onChange={(e) => setDigits("parentIdNumber", e.target.value)} maxLength={10}/>
                      {errors.parentIdNumber && <p style={errStyle}>{errors.parentIdNumber}</p>}
                    </div> */}
                  </div>
                  <div className="grid grid-2">
                    <div className="field">
                      <label className="label text-xs">Phone Number</label>
                      <input className="input" required type="tel" inputMode="numeric" pattern="\d*" placeholder="e.g. 0712345678" value={form.parentPhone} onChange={(e) => setDigits("parentPhone", e.target.value)} maxLength={12}/>
                      {errors.parentPhone && <p style={errStyle}>{errors.parentPhone}</p>}
                    </div>
                    <div className="field">
                      <label className="label text-xs">Email (Optional)</label>
                      <input className="input" type="email" placeholder="e.g. parent@email.com" value={form.parentEmail} onChange={(e) => set("parentEmail", e.target.value)} maxLength={100}/>
                      {errors.parentEmail && <p style={errStyle}>{errors.parentEmail}</p>}
                    </div>
                  </div>
                  <div className="field">
                    <label className="label text-xs">Relationship</label>
                    <select className="select" value={form.parentRelationship} onChange={(e) => set("parentRelationship", e.target.value)} required>
                      <option value="">Select relationship</option>
                      <option value="Father">Father</option>
                      <option value="Mother">Mother</option>
                      <option value="Guardian">Guardian</option>
                    </select>
                    {errors.parentRelationship && <p style={errStyle}>{errors.parentRelationship}</p>}
                  </div>
                </div>
              </div>

              <div className="alert muted">
                <strong className="foreground-text">Security note:</strong> The parent account will be created pending Admin verification.
                The parent must provide their National ID and linked student admission number to access the portal.
              </div>

              <div className="flex gap-3 justify-end">
                <button type="button" className="btn btn-outline" onClick={() => setOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary"><GraduationCap /> Register Student</button>
              </div>
            </form>
          </div>
        </div>)}
    </>);
};
export default AddStudentDialog;
