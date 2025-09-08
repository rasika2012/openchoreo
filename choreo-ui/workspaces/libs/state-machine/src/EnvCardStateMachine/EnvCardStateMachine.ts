import { assign, createMachine } from "xstate";

export function getEnvCardStateMachine() {
  return createMachine({
    // eslint-disable-next-line max-len
    /** @xstate-layout N4IgpgJg5mDOIC5RgHYDcC0BjAhgJwg1gBcdiwMBbHLACwEsUwA6MSgB2IE8BiCMdgBsA9lwDaABgC6iUO2Gx6xesJSyQAD0QBmCcwCsARgAcANgCcE06f1n9R7QBoQXRBlN6A7PtPHzAFltPbUMjQIBfcOdUTFwCIlJyKhoGJmZGAH12PGEoPDhYHlgAVywsAskZJBB5RWVVdS0EACZzbWYJCV1jQ09m-X9Pf0NnVwR3fQMrP31PS29PY0jo9Gx8QhIyCmo6RhZM7Nz82EKAMxx6QUhK9VqlFTVqpt72zu7e-sH-LtHEf3NmBZ-MZ9F0gj02stwKs4htEtsUntmPwhKJIDxiigMiiROJpLcFPcGk8-nNmP5AhJjM1moY6YMQb8EP9AQEQWDjItDG19FCYmt4pskjtUiwcWiIDw8JjlJQwBkwHgcngbtU7vVHqAmtp9O1zOYfJ5vAFTP1jEzDCFmM1AgtTKEPBJBnyYesEltkrs0orlVKwMQ8HiqnJCRrGoh7B0ulT+uZDN8DRSmZ49BZuZ4bMMArTtC7Ym6hQivSxMdiBLj0fky6igwS6g9w+MddbBt5jH5vs0U-4mc0qcxzNZLDbqZ1eVCUMJ+PBqvzYe7hYimHWiZrNG5DLTmEaIT0bcC+kyML1PMxtINLCEwkNvHmBXCPSKkWxOGMQ-XiVq3MFt1zzHuKU5Zoj1NKMLAkE9NwkYJBzvedC09UV0ixQ48gKFcwxJBB438M9aX1c9hm0Ps2iPeMOkWfRmlMFMBjmdsliiaF80FeFEKRcUuEgDCGywylmDMDx7WaYj7WMQIjz8ASL16QwaOgxZPDggs2Kfb0lWEPAeM-ddsO0YxWQIzlPDk-8JGAlxEFCXCaREm05g8EFxOU1jHyXEssU47i1VDXiv2w74z3+bRiOo7RzBTG1e37QdwJHPsJHHSIgA */
    id: "env-card-state-machine",
    initial: "empty",
    context: {
      errorMessage: "",
    },
    states: {
      empty: {
        on: {
          deploy: "in_progress",
        },
      },

      in_progress: {
        on: {
          success: "deployed",
          failed: {
            target: "error",
            actions: assign({
              errorMessage: ({ event }) => event?.errorMessage,
            }),
          },
        },
      },

      deployed: {
        on: {
          un_deploy: "un_deployed",
          runtime_error: {
            target: "error",
            actions: assign({
              errorMessage: ({ event }) => event?.errorMessage,
            }),
          },
        },
      },

      error: {
        on: {
          retry: {
            target: "in_progress",
            actions: assign({
              errorMessage: () => "",
            }),
          },
        },
      },

      un_deployed: {
        on: {
          re_deploy: "in_progress",
        },
      },
    },
  });
}
