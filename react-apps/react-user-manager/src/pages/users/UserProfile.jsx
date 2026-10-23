
import { useParams } from "react-router";
import useUserData from "../../hooks/useUserData";

export default function UserProfile() {
  const { userId } = useParams();
  const { data: user, isLoading, isError, error } = useUserData(userId);

  if (!userId) return <ProfileMessage>User ID is missing.</ProfileMessage>;
  if (isLoading) return <ProfileMessage>Loading user profile…</ProfileMessage>;
  if (isError) {
    return (
      <ProfileMessage role="alert">
        Could not load this user profile: {error.message}
      </ProfileMessage>
    );
  }
  if (!user) return <ProfileMessage>User not found.</ProfileMessage>;

  const fullName = [
    user.firstName,
    user.maidenName && `(${user.maidenName})`,
    user.lastName,
  ]
    .filter(Boolean)
    .join(" ");

  const address = user.address || {};
  const company = user.company || {};

  const sections = [
    {
      title: "Personal Information",
      icon: "👤",
      items: [
        ["First Name", user.firstName],
        ["Last Name", user.lastName],
        ["Maiden Name", user.maidenName],
        ["Age", user.age],
        ["Gender", user.gender],
        ["Date of Birth", user.birthDate],
        ["Blood Group", user.bloodGroup],
      ],
    },
    {
      title: "Contact Information",
      icon: "📞",
      items: [
        ["Email", user.email],
        ["Phone", user.phone],
        ["Username", user.username],
        ["IP Address", user.ip],
      ],
    },
    {
      title: "Address",
      icon: "📍",
      items: [
        ["Street", address.address],
        ["City", address.city],
        ["State", address.state],
        ["Postal Code", address.postalCode],
        ["Country", address.country],
        [
          "Coordinates",
          address.coordinates
            ? `${address.coordinates.lat}, ${address.coordinates.lng}`
            : null,
        ],
      ],
    },
    {
      title: "Company Information",
      icon: "🏢",
      items: [
        ["Company", company.name],
        ["Job Title", company.title],
        ["Department", company.department],
        ["Office Address", company.address?.address],
        ["Office City", company.address?.city],
      ],
    },
    {
      title: "Education & Appearance",
      icon: "🎓",
      items: [
        ["University", user.university],
        ["Height", user.height != null ? `${user.height} cm` : null],
        ["Weight", user.weight != null ? `${user.weight} kg` : null],
        ["Eye Color", user.eyeColor],
        [
          "Hair",
          user.hair
            ? `${user.hair.color}, ${user.hair.type}`
            : null,
        ],
      ],
    },
  ];

  return (
    <main className="w-full min-w-0 px-4 py-6 sm:px-6 sm:py-8 lg:px-10">
      <div className="mx-auto w-full max-w-6xl space-y-5 sm:space-y-6">

        {/* Profile Header */}
        <section className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
          <div className="h-36 bg-gradient-to-r from-black via-neutral-700 to-neutral-400 sm:h-48" />

          <div className="px-4 pb-5 sm:px-8 sm:pb-7">
            <div className="-mt-14 flex flex-col gap-4 sm:-mt-16 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                <img
                  src={
                    user.image ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      `${user.firstName || ""} ${user.lastName || ""}`
                    )}`
                  }
                  alt={fullName}
                  className="border-card h-28 w-28 rounded-2xl border-4 bg-card object-cover grayscale shadow-md sm:h-32 sm:w-32"
                />

                <div className="sm:pb-2">
                  <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
                    {fullName}
                  </h1>

                  <p className="mt-1 text-muted-foreground">
                    @{user.username}
                  </p>

                  <p className="mt-2 text-sm text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="sm:pb-3">
                <span
                  className="inline-flex rounded-full bg-secondary px-4 py-2 text-sm font-semibold capitalize text-secondary-foreground"
                >
                  {user.role || "user"}
                </span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Stat label="Age" value={user.age ?? "—"} />
              <Stat label="Gender" value={user.gender || "—"} />
              <Stat label="Blood Group" value={user.bloodGroup || "—"} />
              <Stat label="Employee ID" value={`#${user.id}`} />
            </div>
          </div>
        </section>

        {/* Information Sections */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {sections.map((section) => {
            const visibleItems = section.items.filter(
              ([, value]) =>
                value !== undefined &&
                value !== null &&
                value !== ""
            );

            if (!visibleItems.length) return null;

            return (
              <section
                key={section.title}
                className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-6"
              >
                <div className="mb-5 flex items-center gap-3 border-b border-border pb-4">
                  <span className="bg-secondary text-secondary-foreground flex h-10 w-10 items-center justify-center rounded-xl text-xl">
                    {section.icon}
                  </span>

                    <h2 className="text-lg font-bold text-foreground">
                    {section.title}
                  </h2>
                </div>

                <dl className="space-y-4">
                  {visibleItems.map(([label, value]) => (
                    <div
                      key={label}
                      className="flex flex-col justify-between gap-1 sm:flex-row sm:gap-4"
                    >
                      <dt className="text-sm text-muted-foreground">
                        {label}
                      </dt>

                      <dd className="break-words text-sm font-medium text-foreground sm:max-w-[60%] sm:text-right">
                        {String(value)}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            );
          })}
        </div>

        {/* Account Metadata */}
        <section className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-6">
          <h2 className="text-lg font-bold text-foreground">
            Account Information
          </h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Meta
              label="Company"
              value={company.name}
            />
            <Meta
              label="Job Title"
              value={company.title}
            />
            <Meta
              label="MAC Address"
              value={user.macAddress}
            />
            <Meta
              label="University"
              value={user.university}
            />
          </div>
        </section>
      </div>
    </main>
  );
}

function ProfileMessage({ children, role }) {
  return (
    <main className="w-full px-4 py-6 sm:px-6 sm:py-8 lg:px-10">
      <p className="border-border bg-card text-foreground mx-auto max-w-6xl rounded-xl border p-6" role={role}>
        {children}
      </p>
    </main>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl bg-muted p-3 sm:p-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-foreground mt-1 truncate text-lg font-bold capitalize">
        {value}
      </p>
    </div>
  );
}

function Meta({ label, value }) {
  if (value == null || value === "") return null;

  return (
    <div className="rounded-xl bg-muted p-4">
      <p className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
        {label}
      </p>
      <p className="text-foreground mt-2 break-words text-sm font-semibold">
        {value}
      </p>
    </div>
  );
}
