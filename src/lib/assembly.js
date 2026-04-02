import assemblyRaw from '../data/assembly.json';

const assemblyData = Array.isArray(assemblyRaw) ? assemblyRaw : [];

export function getAllMembers() {
  return assemblyData;
}

export function getMemberById(id) {
  return assemblyData.find(m => m.id === id) || null;
}

export function getMembersByParty(party) {
  return assemblyData.filter(m => m.party === party);
}

export function getMembersByRegion(region) {
  return assemblyData.filter(m => m.region === region);
}

export function getOverallScore(member) {
  if (!member || !member.stats) return 0;
  const s = member.stats;
  return Math.round(
    (s.intelligence + s.stamina + s.combat + s.charisma + s.wealth + s.defense) / 6
  );
}

export function getTopMembers(n = 10, sortBy = 'overall') {
  const sorted = [...assemblyData].sort((a, b) => {
    if (sortBy === 'overall') return getOverallScore(b) - getOverallScore(a);
    return (b.stats[sortBy] || 0) - (a.stats[sortBy] || 0);
  });
  return sorted.slice(0, n);
}

export function searchMembers(query, filters = {}) {
  let results = assemblyData;

  if (query) {
    const q = query.toLowerCase();
    results = results.filter(m =>
      m.name.includes(q) ||
      m.party.includes(q) ||
      (m.region || '').includes(q) ||
      (m.constituency || '').includes(q)
    );
  }

  if (filters.party) {
    results = results.filter(m => m.party === filters.party);
  }

  return results;
}
