import { useState, useEffect } from "react";
import { Plus, GraduationCap, UserCheck } from "lucide-react";
import { toast } from "@/lib/toast";
const INITIAL = {
    admissionNo: "", fullName: "", className: "", stream: "", dateOfBirth: "",
    parentFullName: "", parentIdNumber: "", parentPhone: "", parentEmail: "", parentRelationship: "",
};
const AddStudentDialog = () => {
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState(INITIAL);
    const set = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));
    // ESC to close
    useEffect(() => {
        if (!open)
            return;
        const onKey = (e) => { if (e.key === "Escape")
            setOpen(false); };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [open]);
    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success("Student registered successfully", { description: `${form.fullName} linked to parent ${form.parentFullName}` });
        setForm(INITIAL);
        setOpen(false);
    };
    return (<>
      <button className="btn btn-primary" onClick={() => setOpen(true)}>
        <Plus /> Add Student
      </button>
      {open && (<div className="modal-backdrop" role="dialog" aria-modal="true" onClick={(e) => e.target === e.currentTarget && setOpen(false)}>
          <div className="modal">
            <h2><GraduationCap /> Register New Student</h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div>
                <h3 className="text-sm font-bold mb-3">Student Information</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <div className="grid grid-2">
                    <div className="field">
                      <label className="label text-xs">Admission No</label>
                      <input className="input" required placeholder="e.g. ADM2024006" value={form.admissionNo} onChange={(e) => set("admissionNo", e.target.value)}/>
                    </div>
                    <div className="field">
                      <label className="label text-xs">Full Name</label>
                      <input className="input" required placeholder="e.g. John Kamau" value={form.fullName} onChange={(e) => set("fullName", e.target.value)}/>
                    </div>
                  </div>
                  <div className="grid grid-3">
                    <div className="field">
                      <label className="label text-xs">Class</label>
                      <select className="select" value={form.className} onChange={(e) => set("className", e.target.value)} required>
                        <option value="">Class</option>
                        {["Form 1A", "Form 1B", "Form 2A", "Form 2B", "Form 3A", "Form 3B", "Form 4A", "Form 4B"].map((c) => (<option key={c} value={c}>{c}</option>))}
                      </select>
                    </div>
                    <div className="field">
                      <label className="label text-xs">Stream</label>
                      <select className="select" value={form.stream} onChange={(e) => set("stream", e.target.value)}>
                        <option value="">Stream</option>
                        <option value="East">East</option>
                        <option value="West">West</option>
                        <option value="North">North</option>
                      </select>
                    </div>
                    <div className="field">
                      <label className="label text-xs">Date of Birth</label>
                      <input className="input" required type="date" value={form.dateOfBirth} onChange={(e) => set("dateOfBirth", e.target.value)}/>
                    </div>
                  </div>
                </div>
              </div>

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
                      <label className="label text-xs">Parent Full Name</label>
                      <input className="input" required placeholder="e.g. Mary Kamau" value={form.parentFullName} onChange={(e) => set("parentFullName", e.target.value)}/>
                    </div>
                    <div className="field">
                      <label className="label text-xs">National ID Number</label>
                      <input className="input" required placeholder="e.g. 12345678" value={form.parentIdNumber} onChange={(e) => set("parentIdNumber", e.target.value)}/>
                    </div>
                  </div>
                  <div className="grid grid-2">
                    <div className="field">
                      <label className="label text-xs">Phone Number</label>
                      <input className="input" required type="tel" placeholder="e.g. 0712345678" value={form.parentPhone} onChange={(e) => set("parentPhone", e.target.value)}/>
                    </div>
                    <div className="field">
                      <label className="label text-xs">Email (Optional)</label>
                      <input className="input" type="email" placeholder="e.g. parent@email.com" value={form.parentEmail} onChange={(e) => set("parentEmail", e.target.value)}/>
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
