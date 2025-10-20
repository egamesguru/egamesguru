import PreferencesForm from "./PreferencesForm";

export default function Preferences() {
  return (
    <div className="grow space-y-10 md:max-w-lg">
      <div className="flex gap-4 items-center">
        <h1 className="text-3xl font-light">Meine Präferenzen</h1>
      </div>

      <div>
        <h2 className="text-lg font-bold">Welche Genres bevorzugst du?</h2>
      </div>

      <PreferencesForm />
    </div>
  );
}
