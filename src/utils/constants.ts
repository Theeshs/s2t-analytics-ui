export const enum AsyncState {
  IDLE = "idle",
  LOADING = "loading",
  SUCCESS = "success",
  FAILED = "failed",
}
export const enum Roles {
  PERSONAL = "personal",
  MANAGER = "manager",
}

export const enum Routes {
  HOME = "/",
  BUILDER = "/dashboard/:id",
  DOCUMENT = "/document",
  IDEA = "/idea",
  SECURITY = "/security",
  SETTING = "/setting",
}

export const enum RoutesName {
  HOME = "home",
  BUILDER = "builder",
  DOCUMENT = "documents",
  IDEA = "ideas",
  SECURITY = "security",
  SETTING = "setting",
}

export const enum LogoSize {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
}

export const enum DashboardMessage {
  FOR_PERSONAL = "Manage your documents.",
  FOR_MANAGER = "Manage your documents issued by SMU Academy or track your career    goal.",
}

export interface JsonObject {
  bar: {},
  line: {},
  pie: {},
  doughnut: {}
}