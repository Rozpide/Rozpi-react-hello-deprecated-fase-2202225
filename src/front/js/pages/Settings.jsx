import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js";


export const Settings = () => {
    const { store, actions } = useContext(Context);
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState(store.user.name || '');
    const [nationality, setNationality] = useState(store.user.nationality || '');
    const [residence, setResidence] = useState(store.user.residence || '');

    const editData = async (event) => {
        event.preventDefault();
        const updatedData = {name: name, nationality: nationality, residence: residence};
        const success = await actions.editData(store.user.id, updatedData);
        if (success) {
            alert('Success!')
            setEditing(false);
        } else {
            alert('Something went wrong');
        };
    }

    const removeAccount = async () => {
        const success = await actions.removeAccount(store.user.id);
        if (success) {
            alert('Your account was successfully removed')
        } else {
            alert('Something went wrong');
        };
    }

    return (
        <div className="container d-flex">
            <div className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary" style={{ width: '280px' }}>
                <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                </a>
                <ul className="nav nav-pills flex-column mb-auto tab-pane fade show active">
                    <li className="nav-item" role="presentation">
                        <a className="nav-link active" id="tab-data" data-bs-toggle="pill" href="#pills-data" role="tab" aria-controls="pills-data" aria-selected="true">
                            Data
                        </a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a className="nav-link" id="tab-account" data-bs-toggle="pill" href="#pills-account" role="tab" aria-controls="pills-account" aria-selected="false">
                            Account
                        </a>
                    </li>
                </ul>
            </div>
            <div className="tab-content ms-5">
                <div className="tab-pane fade show active" id="pills-data" role="tabpanel" aria-labelledby="tab-data">
                    <h1 className="mt-3 mb-5">Edit your data</h1>
                    <form className="align-items-center" onSubmit={editData}>
                        <div className="row g-3 align-items-center mb-2">
                            <div className="col-auto">
                                <label htmlFor="name" className="col-form-label fw-bold">Name</label>
                            </div>
                            <div className="col-auto">
                                {editing ? <input type="text" style={{width: '600px'}} value={name} onChange={(e) => setName(e.target.value)} id="name" className="form-control" aria-describedby="userName" /> : store.user.name}
                            </div>
                        </div>
                        <div className="row g-3 align-items-center mb-2">
                            <div className="col-auto">
                                <label htmlFor="nationality" className="col-form-label fw-bold">Nationality</label>
                            </div>
                            <div className="col-auto">
                                {editing ? <input type="text" style={{width: '600px'}} value={nationality} onChange={(e) => setNationality(e.target.value)} id="nationality" className="form-control" aria-describedby="userNationality" /> : store.user.nationality}
                            </div>
                        </div>
                        <div className="row g-3 align-items-center mb-2">
                            <div className="col-auto">
                                <label htmlFor="residence" className="col-form-label fw-bold">Residence</label>
                            </div>
                            <div className="col-auto">
                                {editing ? <input type="text" style={{width: '600px'}} value={residence} onChange={(e) => setResidence(e.target.value)} id="residence" className="form-control" aria-describedby="userResidence" /> : store.user.residence}
                            </div>
                        </div>
                        {editing ?
                            <button type="submit" className="btn btn-dark mt-4">Save</button>
                            :
                            ''
                        }
                    </form>
                    <div>
                        {editing ?
                            ''
                            :
                            <button type="button" className="btn btn-dark mt-4" onClick={() => setEditing(true)}>Edit</button>
                        }
                    </div>
                </div>
                <div className="tab-pane fade" id="pills-account" role="tabpanel" aria-labelledby="tab-account">
                    <h1 className="mt-3 mb-5">Remove your account</h1>
                    <p>Before pushing the button, we warn you that this action cannot be undone.</p>
                    <button type="button" className="btn btn-dark mt-4" onClick={removeAccount}>Remove</button>
                </div>
            </div>
        </div>
    )
}