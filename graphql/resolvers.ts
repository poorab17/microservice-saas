import CompetitionController from "../controller/competition";

const resolvers = {
  Mutation: {
    createCompetition: async (
      _: any,
      args: {
        category: string;
        name: string;
        code: string;
        place: string;
        fromDate: string;
        toDate: string;
        conductedBy: string;
        createdAt: string;
      }
    ) => {
      try {
        const competition = await CompetitionController.createCompetition(args);
        return competition;
      } catch (error: any) {
        return {
          success: false,
          message: `Failed to create competition: ${error.message}`,
        };
      }
    },
    updateCompetition: async (
      _: any,
      args: {
        id: string;
        data: {
          category: string;
          name: string;
          code: string;
          place: string;
          fromDate: string;
          toDate: string;
          conductedBy: string;
        };
      }
    ) => {
      try {
        const competition = await CompetitionController.updateCompetition(
          parseInt(args.id),
          args.data
        );
        return competition;
      } catch (error: any) {
        return {
          success: false,
          message: `Failed to update competition: ${error.message}`,
        };
      }
    },

    deleteCompetition: async (
      _: any,
      args: {
        id: string;
      }
    ) => {
      try {
        const competition = await CompetitionController.deleteCompetition(
          parseInt(args.id)
        );
        return competition;
      } catch (error: any) {
        return {
          success: false,
          message: `Failed to delete competition: ${error.message}`,
        };
      }
    },
    // Add other mutations for updating and deleting competitions if needed
  },
  Query: {
    // Add queries to retrieve competition data if needed
    getCompetitions: async () => {
      try {
        const competitions = await CompetitionController.getCompetitions();
        return competitions;
      } catch (error: any) {
        throw new Error(`Failed to retrieve competitions: ${error.message}`);
      }
    },
  },
};

export default resolvers;
