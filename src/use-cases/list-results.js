module.exports = function makeListResults ({ bigQuery }) {
    return async function listResults () {
      const total_users = await bigQuery.getTotalUsers();
      const daily_stats = await bigQuery.getDailyStats();
      return {
        "total_users": total_users,
        "daily_stats": daily_stats
      };
    }
  }