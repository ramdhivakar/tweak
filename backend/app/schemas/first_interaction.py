from typing import Literal

from pydantic import BaseModel


CaseStatus = Literal[
    "Pending Customer",
    "Pending Support",
    "Pending Engineering",
]


class CaseDetails(BaseModel):
    caseId: str = ""
    customerName: str = ""
    companyName: str = ""

    product: str = ""
    productVersion: str = ""
    siteId: str = ""

    issue: str = ""
    description: str = ""

    timeZone: str = ""

    availableLogs: str = ""
    previousCase: str = ""


class FirstInteractionAIRequest(BaseModel):
    source: Literal["case", "transcript"]

    case: CaseDetails | None = None


class FirstInteractionAIResult(BaseModel):
    connectedTime: str = ""
    contactMode: str = "Microsoft Teams"

    troubleshootingSteps: str = ""
    resolutionSummary: str = ""

    status: CaseStatus = "Pending Support"

    logsCollected: bool = False
    logFindings: str = ""