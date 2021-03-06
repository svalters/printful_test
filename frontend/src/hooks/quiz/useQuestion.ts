import { useQuery, UseQueryOptions } from "react-query"

import { queryClient } from "@/App"
import { get } from "@/utils"
import { QUIZ_URL } from "@/constants"
import { QuizItem } from "@/types"

interface QuestionParams {
  quizId: string | number
}

/**
 * https://printful.com/test-quiz.php?action=questions&quizId=141
 */
export const fetchQuestions = ({
  quizId,
}: QuestionParams): Promise<QuizItem[]> =>
  get(`${QUIZ_URL}?action=questions&quizId=${quizId}`)

export const prefetchQuestions = ({ quizId }: QuestionParams) =>
  queryClient.prefetchQuery(["questions", quizId], () =>
    fetchQuestions({ quizId })
  )

const useQuestions = (
  { quizId }: QuestionParams,
  options?: UseQueryOptions<QuizItem[]>
) => useQuery(["questions", quizId], () => fetchQuestions({ quizId }), options)

export default useQuestions
