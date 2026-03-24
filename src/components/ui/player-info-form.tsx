import { PlayerFormField } from "./player-form-field";

interface PlayerFormData {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  gender: string;
}

interface PlayerInfoFormProps {
  formData: PlayerFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  title?: string;
}

const genderOptions = [
  { value: "M", label: "Männlich" },
  { value: "F", label: "Weiblich" },
  { value: "O", label: "Andere/Keine Angabe" },
];

export function PlayerInfoForm({
  formData,
  onChange,
  title = "Spieler bearbeiten",
}: PlayerInfoFormProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PlayerFormField
          label="Benutzername"
          name="username"
          type="text"
          value={formData.username}
          onChange={onChange}
          required
        />

        <PlayerFormField
          label="E-Mail"
          name="email"
          type="email"
          value={formData.email}
          onChange={onChange}
          required
        />

        <PlayerFormField
          label="Vorname"
          name="first_name"
          type="text"
          value={formData.first_name}
          onChange={onChange}
          required
        />

        <PlayerFormField
          label="Nachname"
          name="last_name"
          type="text"
          value={formData.last_name}
          onChange={onChange}
          required
        />

        <div className="md:col-span-2">
          <PlayerFormField
            label="Geschlecht"
            name="gender"
            type="select"
            value={formData.gender}
            onChange={onChange}
            options={genderOptions}
          />
        </div>
      </div>
    </div>
  );
}