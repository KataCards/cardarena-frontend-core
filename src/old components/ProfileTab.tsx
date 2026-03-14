"use client";
import { useState, useEffect } from 'react';
import { CurrentUser } from '@/types/user';
import { DashboardStats } from '@/types/stats';
import { fetchCurrentUser, fetchDashboardStats } from '@/lib/apiClient';
import { UserCircle, BarChart3, Users, Trophy, Gamepad2Icon } from 'lucide-react';

export default function ProfileTab() {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [errorUser, setErrorUser] = useState<string | null>(null);
  const [errorStats, setErrorStats] = useState<string | null>(null);

  useEffect(() => {
    setIsLoadingUser(true);
    setErrorUser(null);
    fetchCurrentUser()
      .then(setCurrentUser)
      .catch(err => {
        console.error("Failed to fetch current user:", err);
        setErrorUser(err.message || "Benutzerdaten konnten nicht geladen werden.");
      })
      .finally(() => setIsLoadingUser(false));

    setIsLoadingStats(true);
    setErrorStats(null);
    fetchDashboardStats()
      .then(setStats)
      .catch(err => {
        console.error("Failed to fetch dashboard stats:", err);
        setErrorStats(err.message || "Statistiken konnten nicht geladen werden.");
      })
      .finally(() => setIsLoadingStats(false));
  }, []);

  const StatCard = ({ title, value, icon, isLoadingFlag, errorFlag }: { title: string; value: string | number; icon: React.ReactNode; isLoadingFlag?: boolean; errorFlag?: string | null }) => (
    <div className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition-shadow">
      <div className="flex items-center text-red-600 mb-2">
        {icon}
        <h3 className="ml-2 text-lg font-semibold text-gray-700">{title}</h3>
      </div>
      {isLoadingFlag ? (
        <p className="text-3xl font-bold text-gray-500 animate-pulse">...</p>
      ) : errorFlag ? (
         <p className="text-sm text-red-500">Fehler</p>
      ) : (
        <p className="text-3xl font-bold text-gray-800">{value}</p>
      )}
    </div>
  );


  return (
    <div>
      <section className="mb-10">
        <div className="flex items-center mb-6">
            <UserCircle size={32} className="text-red-600 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-800">Benutzerprofil</h2>
        </div>
        {isLoadingUser && <p className="text-gray-600">Lade Benutzerdaten...</p>}
        {errorUser && <p className="text-red-500 bg-red-50 p-3 rounded-md">{errorUser}</p>}
        {currentUser && !isLoadingUser && (
          <div className="bg-gray-50 p-6 rounded-lg shadow space-y-3">
            <p><strong>Username:</strong> {currentUser.username}</p>
            <p><strong>E-Mail:</strong> {currentUser.email}</p>
            <p><strong>Name:</strong> {currentUser.first_name || '-'} {currentUser.last_name || '-'}</p>
            {/* Add more user details here */}
          </div>
        )}
      </section>

      <section>
        <div className="flex items-center mb-6">
            <BarChart3 size={32} className="text-red-600 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-800">Dashboard Statistiken</h2>
        </div>
        {errorStats && !isLoadingStats && <p className="text-red-500 bg-red-50 p-3 rounded-md mb-4">{errorStats}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Spieler Gesamt" value={stats?.total_players ?? 0} icon={<Users size={24} />} isLoadingFlag={isLoadingStats} errorFlag={errorStats && !stats?.total_players ? errorStats : null} />
          <StatCard title="Aktive Turniere" value={stats?.active_tournaments ?? 0} icon={<Trophy size={24} />} isLoadingFlag={isLoadingStats} errorFlag={errorStats && !stats?.active_tournaments ? errorStats : null}/>
          <StatCard title="Abgeschl. Turniere" value={stats?.finished_tournaments ?? 0} icon={<Trophy size={24} className="opacity-70"/>} isLoadingFlag={isLoadingStats} errorFlag={errorStats && !stats?.finished_tournaments ? errorStats : null}/>
          <StatCard title="Kartenspiele" value={stats?.uniqueCardGames ?? 0} icon={<Gamepad2Icon size={24} />} isLoadingFlag={isLoadingStats} errorFlag={errorStats && !stats?.uniqueCardGames ? errorStats : null}/>
        </div>
      </section>
    </div>
  );
}