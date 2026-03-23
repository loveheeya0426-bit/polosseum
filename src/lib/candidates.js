import candidatesData from '../data/candidates.json';
import { REGIONS } from './constants';

export function getAllCandidates() {
  return candidatesData;
}

export function getCandidateById(id) {
  return candidatesData.find(c => c.id === id) || null;
}

export function getCandidatesByRegion(regionSlug) {
  const region = REGIONS.find(r => r.slug === regionSlug);
  if (!region) return [];
  return candidatesData.filter(c => c.region === region.name);
}

export function getCandidatesByElectionType(type) {
  return candidatesData.filter(c => c.electionType === type);
}

export function getCandidatesByParty(party) {
  return candidatesData.filter(c => c.party === party);
}

export function getRegionStats() {
  const stats = {};
  for (const region of REGIONS) {
    const candidates = candidatesData.filter(c => c.region === region.name);
    stats[region.slug] = {
      total: candidates.length,
      byType: {},
    };
    const types = [...new Set(candidates.map(c => c.electionType))];
    for (const type of types) {
      stats[region.slug].byType[type] = candidates.filter(c => c.electionType === type).length;
    }
  }
  return stats;
}

export function searchCandidates(query, filters = {}) {
  let results = candidatesData;

  if (query) {
    const q = query.toLowerCase();
    results = results.filter(c =>
      c.name.includes(q) ||
      c.party.includes(q) ||
      c.region.includes(q) ||
      c.district.includes(q)
    );
  }

  if (filters.region) {
    results = results.filter(c => c.region === filters.region);
  }
  if (filters.electionType) {
    results = results.filter(c => c.electionType === filters.electionType);
  }
  if (filters.party) {
    results = results.filter(c => c.party === filters.party);
  }

  return results;
}

export function getOverallScore(candidate) {
  const s = candidate.stats;
  return Math.round((s.experience + s.popularity + s.integrity + s.competency + s.commitment + s.finance) / 6);
}

export function getTopCandidates(n = 10, sortBy = 'overall') {
  const sorted = [...candidatesData].sort((a, b) => {
    if (sortBy === 'overall') return getOverallScore(b) - getOverallScore(a);
    return (b.stats[sortBy] || 0) - (a.stats[sortBy] || 0);
  });
  return sorted.slice(0, n);
}
