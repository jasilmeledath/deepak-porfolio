import Head from 'next/head';
import { useRouter } from 'next/router';

export default function SEO({ 
  title = 'Cybersecurity Professional | Portfolio',
  description = 'Experienced Cybersecurity Engineer specializing in Blue Team operations, SOC Analysis, and Threat Hunting. View my portfolio, certifications, and blog.',
  keywords = 'cybersecurity, SOC analyst, blue team, threat hunting, security engineer, penetration testing',
  ogImage = '/og-image.jpg',
  ogType = 'website',
  author = 'Your Name',
  structuredData = null,
  noIndex = false
}) {
  const router = useRouter();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com';
  const canonicalUrl = `${siteUrl}${router.asPath}`;

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Robots */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      <meta property="og:site_name" content="Cybersecurity Portfolio" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={`${siteUrl}${ogImage}`} />
      
      {/* Viewport */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      
      {/* Theme Color */}
      <meta name="theme-color" content="#050505" />
      
      {/* Structured Data (JSON-LD) */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
    </Head>
  );
}

// Helper function to generate Person schema
export function generatePersonSchema(data) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": data.name || "Cybersecurity Professional",
    "jobTitle": data.jobTitle || "Cybersecurity Engineer",
    "description": data.description || "Experienced in Blue Team operations and threat hunting",
    "url": data.url || process.env.NEXT_PUBLIC_SITE_URL,
    "sameAs": data.socialLinks || [],
    "image": data.image || "/profile.jpg",
    "knowsAbout": data.skills || ["Cybersecurity", "SOC Analysis", "Threat Hunting", "Blue Team Operations"],
  };
}
