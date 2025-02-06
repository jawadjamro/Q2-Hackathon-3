export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-07'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)
export const token = assertValue(
  "skgkpguuXtFXb6wju3VoZCTPB1a3myLxwBGekSDVwVj3ij6LoUgpG69A1t94Exyzg2cgb8zpmQxo5aRsevG6Ulg28omV9tV7mRi50dlA4geFeR5xhRTt0W6CXY3tIGiniZPQsXclu1YIJK1hGA3DHcnqfit8YnEeQtPRmfDYvH0pvWo7tR5V",
  'Missing environment variable: SANITY_API_TOKEN'
)

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
