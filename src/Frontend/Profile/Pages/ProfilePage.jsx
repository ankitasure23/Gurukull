import React from 'react'
import LanguagePreference from '../Components/LanguagePreference';
import OfflineContentList from '../Components/OfflineContentList';
import UserInfoForm from '../Components/UserInfoForm';

function ProfilePage() {

    return (
        <div className="profile-container w-full min-h-screen p-6 space-y-8">

            {/* Header */}
            <div className="profile-header">
                <h1 className="profile-title text-purple-950 text-6xl font-bold"> My Profile</h1>
            </div>

            {/* User Info */}
            <div className="profile-card">
                <h2 className="section-title text-purple-900 font-bold text-3xl pb-6">User Information</h2>
                <UserInfoForm/>
            </div>

            {/* Language Preferences */}
            <div className="profile-card">
                <h2 className="section-title text-purple-900 font-bold text-3xl pb-5">🌐 Language Preferences</h2>
                <LanguagePreference />
            </div>

            {/* Offline Content */}
            <div className="profile-card">
                <h2 className="section-title text-purple-900 font-bold text-3xl pb-5">📂 Offline Content</h2>
                <OfflineContentList /> {/* ✅ fixed */}
            </div>
        </div>
    );
}

export default ProfilePage