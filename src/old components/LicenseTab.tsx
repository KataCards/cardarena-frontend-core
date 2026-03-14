"use client";
import { useState, useEffect } from 'react';
import { LicenseInfo, LicenseType } from '@/types/user';
import { fetchLicenseInfo, fetchLicenseTypeById, fetchLicenseTypes } from '@/lib/apiClient';
import { 
  FileText, 
  Calendar, 
  User, 
  CheckCircle, 
  AlertTriangle, 
  ExternalLink, 
  CreditCard, 
  Crown, 
  RefreshCw,
  Loader2
} from 'lucide-react';

export default function LicenseTab() {
  const [licenseInfo, setLicenseInfo] = useState<LicenseInfo | null>(null);
  const [licenseType, setLicenseType] = useState<LicenseType | null>(null);
  const [allLicenseTypes, setAllLicenseTypes] = useState<LicenseType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingTypes, setIsLoadingTypes] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadLicenseData();
  }, []);

  const loadLicenseData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // First, load the user's license information
      console.log('Loading license information...');
      const licenseResponse = await fetchLicenseInfo();
      
      // Handle the case where API returns an array
      let license: LicenseInfo | null = null;
      if (Array.isArray(licenseResponse)) {
        console.log('License response is an array:', licenseResponse);
        if (licenseResponse.length > 0) {
          license = licenseResponse[0]; // Take the first license
          console.log('Using first license from array:', license);
    }
      } else {
        license = licenseResponse;
        console.log('License response is a single object:', license);
      }

      if (!license) {
        setError("Keine Lizenzinformationen verfügbar.");
      setIsLoading(false);
        return;
    }

      setLicenseInfo(license);
      console.log('License info loaded:', license);

      // Now that we have license info, fetch the specific license type details
      if (license.license_type) {
        console.log('Fetching license type details for ID:', license.license_type);
    try {
          const licenseTypeDetails = await fetchLicenseTypeById(license.license_type);
          setLicenseType(licenseTypeDetails);
          console.log('License type details loaded:', licenseTypeDetails);
        } catch (typeError) {
          console.error('Failed to fetch license type details:', typeError);
          // Don't set main error, just log it - we can still show basic license info
        }
      }

      // Load all license types for comparison (non-blocking)
      setIsLoadingTypes(true);
    try {
        const allTypes = await fetchLicenseTypes();
        setAllLicenseTypes(allTypes);
        console.log('All license types loaded:', allTypes);
      } catch (typesError) {
        console.error('Failed to fetch all license types:', typesError);
        // Don't block the main UI for this
      } finally {
        setIsLoadingTypes(false);
      }

    } catch (err: any) {
      console.error("Failed to fetch license info:", err);
      setError(err.message || "Lizenzinformationen konnten nicht geladen werden.");
    } finally {
      setIsLoading(false);
    }
  };

  const isLicenseExpired = (expiresDate: string): boolean => {
    try {
      // Handle the date format "2025-05-30"
      const expiry = new Date(expiresDate + 'T00:00:00');
      const today = new Date();
      // Reset time to compare only dates
      today.setHours(0, 0, 0, 0);
      expiry.setHours(0, 0, 0, 0);
      
      return expiry < today;
    } catch (error) {
      console.error('Error parsing expiry date:', expiresDate, error);
      return false; // Default to not expired if we can't parse the date
    }
  };

  const formatDate = (dateString: string): string => {
    try {
      // Handle the date format "2025-05-30"
      const date = new Date(dateString + 'T00:00:00');
      
      // Check if date is valid
      if (isNaN(date.getTime())) {
        console.error('Invalid date string:', dateString);
        return dateString; // Return original string if parsing fails
      }
      
      return date.toLocaleDateString('de-DE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      console.error('Error formatting date:', dateString, error);
      return dateString; // Return original string if formatting fails
    }
  };

  const formatCurrency = (amount: number): string => {
    try {
      return new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR'
      }).format(amount);
    } catch (error) {
      console.error('Error formatting currency:', amount, error);
      return `€${amount}`; // Fallback formatting
    }
  };

  const getDaysUntilExpiry = (expiresDate: string): number => {
    try {
      const today = new Date();
      const expiry = new Date(expiresDate + 'T00:00:00');
      
      // Check if dates are valid
      if (isNaN(today.getTime()) || isNaN(expiry.getTime())) {
        console.error('Invalid dates for calculation:', { today, expiry, expiresDate });
        return 0;
      }
      
      // Reset time to compare only dates
      today.setHours(0, 0, 0, 0);
      expiry.setHours(0, 0, 0, 0);
      
      const diffTime = expiry.getTime() - today.getTime();
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    } catch (error) {
      console.error('Error calculating days until expiry:', expiresDate, error);
      return 0;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-red-600" />
        <span className="ml-3 text-gray-600">Lizenzinformationen werden geladen...</span>
      </div>
  );
}

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-center">
          <AlertTriangle className="w-6 h-6 text-red-600 mr-3" />
          <div>
            <h3 className="text-lg font-medium text-red-800">Fehler beim Laden</h3>
            <p className="text-red-700 mt-1">{error}</p>
            <button
              onClick={loadLicenseData}
              className="mt-3 inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Erneut versuchen
            </button>
          </div>
              </div>
              </div>
  );
}

  if (!licenseInfo) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <div className="text-center">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Keine Lizenz gefunden</h3>
          <p className="text-gray-600">Es wurden keine Lizenzinformationen für Ihr Konto gefunden.</p>
        </div>
      </div>
    );
  }

  const isExpired = isLicenseExpired(licenseInfo.expires_date);
  const daysUntilExpiry = getDaysUntilExpiry(licenseInfo.expires_date);

  return (
    <div className="space-y-6">
      {/* License Status Header */}
      <div className={`rounded-lg p-6 ${isExpired ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
        <div className="flex items-center">
          {isExpired ? (
            <AlertTriangle className="w-8 h-8 text-red-600 mr-4" />
          ) : (
            <CheckCircle className="w-8 h-8 text-green-600 mr-4" />
          )}
          <div className="flex-1">
            <h2 className={`text-xl font-semibold ${isExpired ? 'text-red-800' : 'text-green-800'}`}>
              {isExpired ? 'Lizenz abgelaufen' : 'Lizenz aktiv'}
            </h2>
            <p className={`${isExpired ? 'text-red-700' : 'text-green-700'}`}>
              {isExpired 
                ? `Ihre Lizenz ist seit ${Math.abs(daysUntilExpiry)} Tagen abgelaufen`
                : daysUntilExpiry <= 7 
                  ? `Läuft in ${daysUntilExpiry} Tagen ab`
                  : `Gültig bis ${formatDate(licenseInfo.expires_date)}`
              }
            </p>
          </div>
          {licenseType && (
            <div className="text-right">
              <div className="flex items-center">
                <Crown className="w-5 h-5 text-yellow-500 mr-2" />
                <span className="font-medium text-gray-900">{licenseType.name}</span>
              </div>
              <div className="flex items-center mt-1">
                <CreditCard className="w-4 h-4 text-gray-500 mr-2" />
                <span className="text-sm text-gray-600">{formatCurrency(licenseType.cost)}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* License Details */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <FileText className="w-5 h-5 mr-2" />
          Lizenzdetails
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center">
              <User className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-700">Lizenzinhaber</p>
                <p className="text-gray-900">{licenseInfo.issued_to_username}</p>
                <p className="text-sm text-gray-500">ID: {licenseInfo.issued_to}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Calendar className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-700">Ausstellungsdatum</p>
                <p className="text-gray-900">{formatDate(licenseInfo.issued_date)}</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-700">Ablaufdatum</p>
                <p className={`font-medium ${isExpired ? 'text-red-600' : 'text-gray-900'}`}>
                  {formatDate(licenseInfo.expires_date)}
                </p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Crown className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-700">Lizenztyp</p>
                {licenseType ? (
                  <>
                    <p className="text-gray-900">{licenseType.name}</p>
                    <p className="text-sm text-gray-600">Kosten: {formatCurrency(licenseType.cost)}</p>
                  </>
                ) : (
                  <p className="text-gray-500">ID: {licenseInfo.license_type} (Details werden geladen...)</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Available License Types */}
      {allLicenseTypes.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Crown className="w-5 h-5 mr-2" />
              Verfügbare Lizenztypen
            </h3>
            {isLoadingTypes && (
              <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allLicenseTypes.map((type) => (
              <div 
                key={type.id} 
                className={`border rounded-lg p-4 transition-colors ${
                  licenseType?.id === type.id 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{type.name}</h4>
                  {licenseType?.id === type.id && (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  )}
                </div>
                <p className="text-lg font-semibold text-gray-900">{formatCurrency(type.cost)}</p>
                <p className="text-sm text-gray-600">ID: {type.id}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Expiry Warning */}
      {licenseInfo && isExpired && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-yellow-800 mb-1">Lizenz abgelaufen</h4>
              <p className="text-sm text-yellow-700 mb-2">
                Ihre Lizenz ist am {formatDate(licenseInfo.expires_date)} abgelaufen. 
                Kontaktieren Sie den Support für eine Verlängerung.
              </p>
              <div className="text-sm text-yellow-700">
                <p>• E-Mail: support@cardarena.com</p>
                <p>• Telefon: +49 (0) 123 456 789</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Legal Documents */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <FileText className="w-5 h-5 mr-2" />
          Rechtliche Dokumente
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="#"
            className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FileText className="w-5 h-5 text-gray-400 mr-3" />
            <span className="text-gray-700 flex-1">Allgemeine Geschäftsbedingungen</span>
            <ExternalLink className="w-4 h-4 text-gray-400" />
          </a>
          
          <a
            href="#"
            className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FileText className="w-5 h-5 text-gray-400 mr-3" />
            <span className="text-gray-700 flex-1">Datenschutzerklärung</span>
            <ExternalLink className="w-4 h-4 text-gray-400" />
          </a>
          
          <a
            href="#"
            className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FileText className="w-5 h-5 text-gray-400 mr-3" />
            <span className="text-gray-700 flex-1">Lizenzvereinbarung</span>
            <ExternalLink className="w-4 h-4 text-gray-400" />
          </a>
          
          <a
            href="#"
            className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FileText className="w-5 h-5 text-gray-400 mr-3" />
            <span className="text-gray-700 flex-1">Impressum</span>
            <ExternalLink className="w-4 h-4 text-gray-400" />
          </a>
        </div>
      </div>
    </div>
  );
}