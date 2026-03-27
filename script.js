async function loadCampaignData() {
  try {
    const response = await fetch("content/campaign.json", { cache: "no-store" });
    if (!response.ok) {
      throw new Error("Unable to load campaign content.");
    }
    return response.json();
  } catch (error) {
    const inlineData = document.getElementById("campaign-data");
    if (inlineData?.textContent) {
      return JSON.parse(inlineData.textContent);
    }
    throw error;
  }
}

function findCandidateFromUrl(candidates) {
  const params = new URLSearchParams(window.location.search);
  const candidateId = params.get("id");
  return candidates.find((candidate) => candidate.id === candidateId) || candidates[0];
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };
    return entities[character];
  });
}

function renderStatement(statement) {
  return escapeHtml(statement).replace(/\n+/g, "</p><p>");
}

function buildCandidateCard(candidate) {
  return `
    <article class="candidate-card">
      <a class="candidate-card__link" href="candidate.html?id=${encodeURIComponent(candidate.id)}" aria-label="Open profile for ${escapeHtml(candidate.name)}">
        <img
          class="candidate-card__image"
          src="${escapeHtml(candidate.image)}"
          alt="Portrait placeholder for ${escapeHtml(candidate.name)}"
          onerror="this.src='assets/placeholder-profile.svg';"
        >
        <div class="candidate-card__body">
          <p class="candidate-card__position">${escapeHtml(candidate.position)}</p>
          <h3>${escapeHtml(candidate.name)}</h3>
          <p class="candidate-card__dept">${escapeHtml(candidate.department)}</p>
          <span class="button button--small">Read Full Profile</span>
        </div>
      </a>
    </article>
  `;
}

function buildFeaturedCandidate(candidate) {
  return `
    <article class="featured-card">
      <a class="featured-card__link" href="candidate.html?id=${encodeURIComponent(candidate.id)}" aria-label="Open profile for ${escapeHtml(candidate.name)}">
        <div class="featured-card__image-wrap">
          <img
            class="featured-card__image"
            src="${escapeHtml(candidate.image)}"
            alt="Portrait placeholder for ${escapeHtml(candidate.name)}"
            onerror="this.src='assets/placeholder-profile.svg';"
          >
        </div>
        <div class="featured-card__content">
          <p class="featured-card__label">President</p>
          <h3>${escapeHtml(candidate.name)}</h3>
          <p class="featured-card__position">${escapeHtml(candidate.position)}</p>
          <p class="featured-card__dept">${escapeHtml(candidate.department)}</p>
          <span class="button button--small">Read Full Profile</span>
        </div>
      </a>
    </article>
  `;
}

function buildCandidateProfile(candidate) {
  return `
    <div class="profile-card__image-wrap">
      <img
        class="profile-card__image"
        src="${escapeHtml(candidate.image)}"
        alt="Portrait placeholder for ${escapeHtml(candidate.name)}"
        onerror="this.src='assets/placeholder-profile.svg';"
      >
    </div>
    <div class="profile-card__content">
      <p class="eyebrow">Candidate Profile</p>
      <h2>${escapeHtml(candidate.name)}</h2>
      <p class="profile-card__position">${escapeHtml(candidate.position)}</p>
      <div class="profile-card__meta">
        <div>
          <span class="label">Department</span>
          <p>${escapeHtml(candidate.department)}</p>
        </div>
        <div>
          <span class="label">Email</span>
          <p><a href="mailto:${escapeHtml(candidate.email)}">${escapeHtml(candidate.email)}</a></p>
        </div>
      </div>
      <section class="statement">
        <h2>Why I am running</h2>
        <div class="statement__body"><p>${renderStatement(candidate.statement)}</p></div>
      </section>
      <a class="button button--primary" href="index.html">Back to Team</a>
    </div>
  `;
}

function buildProfileNavigation(candidates, activeCandidate) {
  const currentIndex = candidates.findIndex((candidate) => candidate.id === activeCandidate.id);
  const previousCandidate = candidates[(currentIndex - 1 + candidates.length) % candidates.length];
  const nextCandidate = candidates[(currentIndex + 1) % candidates.length];

  return `
    <a class="profile-nav__link" href="candidate.html?id=${encodeURIComponent(previousCandidate.id)}">
      <span class="label">Previous</span>
      <strong>${escapeHtml(previousCandidate.name)}</strong>
    </a>
    <a class="profile-nav__link profile-nav__link--center" href="index.html#team">
      <span class="label">Back to slate</span>
      <strong>See all candidates</strong>
    </a>
    <a class="profile-nav__link" href="candidate.html?id=${encodeURIComponent(nextCandidate.id)}">
      <span class="label">Next</span>
      <strong>${escapeHtml(nextCandidate.name)}</strong>
    </a>
  `;
}

function renderSiteText(content) {
  const brand = document.getElementById("brand-name");
  const label = document.getElementById("campaign-label");
  const heroTitle = document.getElementById("hero-title");
  const heroLede = document.getElementById("hero-lede");
  const introTitle = document.getElementById("intro-title");
  const introText = document.getElementById("intro-text");
  const footer = document.getElementById("footer-text");
  const profileFooter = document.getElementById("profile-footer-text");

  if (brand) {
    brand.textContent = content.siteName;
  }
  if (label) {
    label.textContent = content.campaignLabel;
  }
  if (heroTitle) {
    heroTitle.textContent = content.heroTitle;
  }
  if (heroLede) {
    heroLede.textContent = content.heroLede;
  }
  if (introTitle) {
    introTitle.textContent = content.introTitle;
  }
  if (introText) {
    introText.textContent = content.introText;
  }
  if (footer) {
    footer.textContent = content.footerText;
  }
  if (profileFooter) {
    profileFooter.textContent = content.profileFooterText;
  }
  const candidateCount = document.getElementById("candidate-count");
  if (candidateCount) {
    candidateCount.textContent = content.candidates.length;
  }
  document.title = `${content.siteName} | CUPE 3906 Campaign`;
}

function renderHomePage(content) {
  const featured = document.getElementById("featured-candidate");
  const grid = document.getElementById("candidate-grid");
  if (!grid) {
    return;
  }
  const president = content.candidates.find((candidate) =>
    candidate.position.trim().toLowerCase() === "president"
  ) || content.candidates[0];
  const remainingCandidates = content.candidates.filter((candidate) => candidate.id !== president.id);

  if (featured) {
    featured.innerHTML = buildFeaturedCandidate(president);
  }
  grid.innerHTML = remainingCandidates.map(buildCandidateCard).join("");
}

function renderCandidatePage(content) {
  const profile = document.getElementById("candidate-profile");
  const profileNav = document.getElementById("profile-nav");
  if (!profile) {
    return;
  }
  const candidate = findCandidateFromUrl(content.candidates);
  profile.innerHTML = buildCandidateProfile(candidate);
  if (profileNav) {
    profileNav.innerHTML = buildProfileNavigation(content.candidates, candidate);
  }
  document.title = `${candidate.name} | ${content.siteName}`;
}

function renderError(message) {
  const grid = document.getElementById("candidate-grid");
  const profile = document.getElementById("candidate-profile");
  if (grid) {
    grid.innerHTML = `<p class="error-box">${message}</p>`;
  }
  if (profile) {
    profile.innerHTML = `<p class="error-box">${message}</p>`;
  }
}

async function init() {
  try {
    const content = await loadCampaignData();
    renderSiteText(content);

    const pageType = document.body.dataset.page;
    if (pageType === "home") {
      renderHomePage(content);
    }
    if (pageType === "candidate") {
      renderCandidatePage(content);
    }
  } catch (error) {
    renderError("Campaign content could not be loaded. If you are previewing locally, use a simple web server or publish the site to static hosting.");
  }
}

init();
