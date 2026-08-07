import { buildInitialContact } from "./initialContact";
import { buildFirstInteraction } from "./firstInteraction";
import { buildSubsequentInteraction } from "./subsequentInteraction";
import { buildVoiceMail } from "./voiceMail";
import { buildNoVoiceMail } from "./noVoiceMail";
import { buildTeamsInvite } from "./teamsInvite";
import { buildRequestLogs } from "./requestLogs";
import { buildEngineeringEscalation } from "./engineeringEscalation";
import { buildHandoff } from "./handoff";
import { buildReassignment } from "./reassignment";
import { buildCaseClosure } from "./caseClosure";
import { buildChaser1, buildChaser2, buildChaser3 } from "./chasers";

export const templateRegistry: Record<string, (c: any) => string> = {
  "initial-contact": buildInitialContact,

  "first-interaction": buildFirstInteraction,

  "subsequent-interaction": buildSubsequentInteraction,

  "voice-mail": buildVoiceMail,

  "no-voice-mail": buildNoVoiceMail,

  "teams-invite": buildTeamsInvite,

  "chaser-1": buildChaser1,

  "chaser-2": buildChaser2,

  "chaser-3": buildChaser3,

  logs: buildRequestLogs,

  engineering: buildEngineeringEscalation,

  handoff: buildHandoff,

  reassignment: buildReassignment,

  closure: buildCaseClosure,
};
