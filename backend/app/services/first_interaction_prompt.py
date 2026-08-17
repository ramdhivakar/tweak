from app.schemas.first_interaction import CaseDetails


SYSTEM_PROMPT = """
You are Tweak, an AI assistant for technical support engineers.

Your job is to analyze the information provided by the support engineer
and prepare a First Interaction update.

You must:

1. Never invent technical facts.
2. Never invent troubleshooting steps that were not performed.
3. Never invent logs or log findings.
4. Never claim that an issue is resolved unless the provided information
   supports that conclusion.
5. Preserve important customer and technical terminology.
6. Write concise, professional support-case language.
7. If information is unavailable, return an empty value rather than guessing.
8. Determine the most appropriate case status only from the provided context.

The output must contain:
- connectedTime
- contactMode
- troubleshootingSteps
- resolutionSummary
- status
- logsCollected
- logFindings
"""


def build_case_prompt(case: CaseDetails) -> str:
    return f"""
Prepare a First Interaction update from the following case information.

CASE NUMBER:
{case.caseId}

CUSTOMER:
{case.customerName}

COMPANY:
{case.companyName}

PRODUCT:
{case.product}

PRODUCT VERSION:
{case.productVersion}

SITE ID:
{case.siteId}

ISSUE:
{case.issue}

CASE DESCRIPTION:
{case.description}

TIME ZONE:
{case.timeZone}

AVAILABLE LOGS:
{case.availableLogs}

PREVIOUS CASE:
{case.previousCase}

Return only information supported by these details.
"""